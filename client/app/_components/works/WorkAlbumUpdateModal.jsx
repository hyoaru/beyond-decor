"use client"

import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

// App imports
import { UPDATE_WORK_ALBUM_FORM_SCHEMA as formSchema } from '@/app/_constants/works/forms'
import FormErrorMessage from '@components/shared/FormErrorMessage'
import useUpdateWorkAlbum from '@/app/_hooks/works/useUpdateWorkAlbum'
import revalidateAllData from '@/app/_services/shared/revalidateAllData'

export default function WorkAlbumUpdateModal(props) {
  const { workAlbum, packages, modalId } = props
  const { id: recordId, thumbnail_path: thumbnailSrc, event_name: eventName } = workAlbum
  const { event_place: eventPlace, event_date: eventDate, client_name: clientName, expand: { package_type: packageType } } = workAlbum
  const { updateWorkAlbum, isLoading } = useUpdateWorkAlbum()
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnailSrc)

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: eventName,
      eventPlace: eventPlace,
      eventDate: dayjs(eventDate).format("YYYY-MM-DD"),
      clientName: clientName,
      packageType: packageType.id,
      thumbnailFile: '',
      imageFiles: '',
    }
  })

  function onImageChange() {
    setThumbnailUrl(URL.createObjectURL(getValues("thumbnailFile")[0]))
  }

  function closeAndResetModal() {
    closeModal()
    resetFields()
  }

  function closeModal() {
    document.getElementById(modalId).close()
  }

  function resetFields() {
    document.querySelector('#thumbnailFile').value = null
    document.querySelector('#imageFiles').value = null
    setThumbnailUrl(thumbnailSrc)
    reset()
  }

  async function onSubmit(data) {
    await updateWorkAlbum({
      recordId: recordId,
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
          toast.error('An error has occured.')

        } else {
          await revalidateAllData()
          closeModal()
          toast.success('Work album has been updated successfully.')
        }
      })
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Update work album</h3>
            <div className="my-4">
              <Image
                width={300}
                height={300}
                src={thumbnailUrl}
                style={{ width: `${300}px`, height: `${300}px` }}
                alt="" className={'rounded-xl object-cover flex mx-auto'}
              />

              <div className="divider">
                <small className='font-bold text-primary'>Choose thumbnail to upload</small>
              </div>
              <div className="form-control w-full flex mx-auto my-3">
                <input
                  id='thumbnailFile'
                  type="file"
                  className="file-input file-input-md file-input-primary file-input-bordered w-full"
                  accept='.jpg, .jpeg, .png'
                  {...register("thumbnailFile", { onChange: onImageChange })}
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
                  id='imageFiles'
                  type="file"
                  className="file-input file-input-sm file-input-bordered w-full"
                  accept='.jpg, .jpeg, .png'
                  {...register("imageFiles")}
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
                  {packages?.[0] && packages.map((_package, index) => (
                    <option
                      key={`PackageType-${index}`}
                      value={_package.id}
                    >
                      {_package.title}
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
                  placeholder={"Enter client to display"}
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
              <button type='button' className="btn" onClick={closeAndResetModal}>Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
