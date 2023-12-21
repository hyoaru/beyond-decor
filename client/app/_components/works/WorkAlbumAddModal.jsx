"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

// App imports
import FormErrorMessage from '@components/shared/FormErrorMessage'
import revalidateAllData from '@services/shared/revalidateAllData'
import { ADD_WORK_ALBUM_FORM_SCHEMA as formSchema } from '@constants/works/forms'
import useAddWorkAlbum from '@hooks/works/useAddWorkAlbum'

export default function WorkAlbumAddModal(props) {
  const { packages, setState } = props
  const modalId = 'WorkAlbumAddModal'
  const [thumbnailUrl, setThumbnailUrl] = useState()
  const { addWorkAlbum, isLoading } = useAddWorkAlbum()
  const packageTypes = Array.from(new Set(packages?.map((pkg) => pkg.title)))

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: '',
      eventPlace: '',
      eventDate: '',
      clientName: '',
      packageType: packageTypes[0],
      thumbnailFile: '',
      imageFiles: '',
    }
  })

  function closeAndResetModal() {
    closeModal()
    resetFields()
  }

  function closeModal() {
    document.getElementById(modalId).close()
  }

  function resetFields() {
    document.querySelector('#thumbnailFileInput').value = null
    document.querySelector('#imageFilesInput').value = null
    setThumbnailUrl(null)
    reset()
  }

  function onThumbnailImageChange() {
    const imageFile = getValues('thumbnailFile')[0]
    if (!imageFile) {
      document.querySelector('#thumbnailFileInput').value = null
      setThumbnailUrl(cardImgSrc)
    } else {
      setThumbnailUrl(URL.createObjectURL(imageFile))
    }
  }

  function onImagesChange() {
    if (!getValues('imageFiles')[0]) {
      document.querySelector('#thumbnailFileInput').value = null
    }
  }

  async function onSubmit(data) {
    await addWorkAlbum({
      eventName: data.eventName,
      eventPlace: data.eventPlace,
      eventDate: data.eventDate,
      clientName: data.clientName,
      packageType: data.packageType,
      thumbnailFile: data.thumbnailFile,
      imageFiles: data.imageFiles,
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast.error("An error has occured.")
        } else {
          await revalidateAllData()
          closeAndResetModal()
          toast.success("Work album has been added successfully.")
        }
      })
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Add work album</h3>
            <div className="my-4">
              {thumbnailUrl && <>
                <Image
                  width={300}
                  height={300}
                  src={thumbnailUrl}
                  style={{ width: `${300}px`, height: `${300}px` }}
                  alt="" className={'rounded-xl object-cover flex mx-auto'}
                />
              </>}

              <div className="divider">
                <small className='font-bold text-primary'>Choose thumbnail to upload</small>
              </div>
              <div className="form-control w-full flex mx-auto my-3">
                <input
                  id='thumbnailFileInput'
                  type="file"
                  className="file-input file-input-md file-input-primary file-input-bordered w-full"
                  accept='.jpg, .jpeg, .png'
                  {...register("thumbnailFile", { onChange: onThumbnailImageChange })}
                />
                {errors.thumbnailFile && <>
                  <FormErrorMessage>{errors.thumbnailFile.message}</FormErrorMessage>
                </>}
              </div>

              <div className="divider">
                <small>Upload <span className='font-bold'>up to 12 images</span> to display</small>
              </div>
              <div className="form-control w-full flex mx-auto my-3">
                <input
                  id='imageFilesInput'
                  type="file"
                  className="file-input file-input-sm file-input-bordered w-full"
                  accept='.jpg, .jpeg, .png'
                  {...register("imageFiles", { onChange: onImagesChange })}
                  multiple
                />
                {errors.imageFiles && <>
                  <FormErrorMessage>{errors.imageFiles.message}</FormErrorMessage>
                </>}
              </div>

              <div className="divider">
                <small>Other required fields</small>
              </div>
              <div className="flex mx-auto mt-2 form-control w-full">
                <input
                  type="text"
                  placeholder={"Enter event name"}
                  className={`input input-bordered w-full ${errors.eventName ? 'input-error' : ''}`}
                  {...register("eventName")}
                />
                {errors.eventName && <>
                  <FormErrorMessage>{errors.eventName.message}</FormErrorMessage>
                </>}
              </div>

              <div className="flex mx-auto mt-2 form-control w-full">
                <input
                  type="text"
                  placeholder={"Enter event place"}
                  className={`input input-bordered w-full ${errors.eventPlace ? 'input-error' : ''}`}
                  {...register("eventPlace")}
                />
                {errors.eventPlace && <>
                  <FormErrorMessage>{errors.eventPlace.message}</FormErrorMessage>
                </>}
              </div>

              <div className="flex mx-auto mt-2 form-control w-full">
                <input
                  type="date"
                  placeholder={"Enter event date"}
                  className={`input input-bordered w-full ${errors.eventDate ? 'input-error' : ''}`}
                  {...register("eventDate")}
                />
                {errors.eventDate && <>
                  <FormErrorMessage>{errors.eventDate.message}</FormErrorMessage>
                </>}
              </div>

              <div className="flex mx-auto mt-2 w-full">
                <select
                  className={`select select-bordered w-full ${errors.packageType ? 'select-error' : ''}`}
                  {...register("packageType")}
                >
                  {packageTypes.map((packageType, index) => (
                    <option
                      key={`PackageType-${index}`}
                      value={packageType}
                    >
                      {packageType}
                    </option>
                  ))}
                </select>
                {errors.packageType && <>
                  <FormErrorMessage>{errors.packageType.message}</FormErrorMessage>
                </>}
              </div>

              <div className="divider">
                <small>Optional</small>
              </div>

              <div className="flex mx-auto mt-2 form-control w-full">
                <input
                  type="text"
                  placeholder={"Enter client name"}
                  className={`input input-bordered w-full ${errors.clientName ? 'input-error' : ''}`}
                  {...register("clientName")}
                />
                {errors.clientName && <>
                  <FormErrorMessage>{errors.clientName.message}</FormErrorMessage>
                </>}
              </div>
            </div>
            <div className="modal-action flex">
              <button type='submit' className="btn btn-primary" disabled={isLoading}>Save</button>
              <button onClick={closeAndResetModal} type='button' className="btn">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
