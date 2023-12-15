"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// App imports
import { useCollectionRecordUpdate } from '../../_hooks/shared/useCollectionRecordUpdate'
import { resizeImage } from '@/app/_libraries/shared/resizeImage'
import revalidateAllData from '@/app/_services/shared/revalidateAllData'
import useUpdatePackage from '@/app/_hooks/index/useUpdatePackage'
import { UPDATE_PACKAGE_FORM_SCHEMA as formSchema } from '@constants/index/forms'
import FormErrorMessage from '@components/shared/FormErrorMessage'

export default function PackageCardUpdateModal(props) {
  const { packageCard, modalId } = props
  const { id: packageId, image_path: cardImgSrc, title, short_description: shortDescription } = packageCard

  const [imageUrl, setImageUrl] = useState(cardImgSrc)
  const { updatePackage, isLoading } = useUpdatePackage()

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      shortDescription: shortDescription,
      imageFile: ''
    }
  })

  function closeAndResetModal(){
    closeModal()
    resetFields()
  }

  function closeModal() {
    document.getElementById(modalId).close()
  }

  function resetFields(){
    document.querySelector('#imageFileInput').value = null
    setImageUrl(cardImgSrc)
    reset()
  }

  function onImageChange() {
    const imageFile = getValues('imageFile')[0]
    if (!imageFile) {
      document.querySelector('#imageFileInput').value = null
      setImageUrl(cardImgSrc)
    } else {
      setImageUrl(URL.createObjectURL(imageFile))
    }
  }

  async function onSubmit(data) {
    await updatePackage({
      recordId: packageId,
      title: data.title,
      shortDescription: data.shortDescription,
      imageFile: data.imageFile
    })
    .then(async ({data, error}) => {
      if (error) {
        console.log(error)

      } else {
        await revalidateAllData()
        closeModal()
      }
    })
  }

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Edit package contents</h3>
            <div className="my-4">
              <Image
                width={300}
                height={300}
                src={imageUrl}
                style={{ width: `${300}px`, height: `${300}px` }}
                alt="" className={'rounded-xl object-cover flex mx-auto'}
              />

              <div className="">
                <div className="divider">
                  <small className='font-bold text-primary'>Choose thumbnail to upload</small>
                </div>
                <div className="form-control w-full flex mx-auto my-3">
                  <input
                    type="file"
                    id='imageFileInput'
                    className="file-input file-input-md file-input-primary file-input-bordered w-full"
                    accept='.jpg, .jpeg, .png'
                    {...register("imageFile", { onChange: onImageChange })}
                  />
                  {errors.imageFile && <>
                    <FormErrorMessage>{errors.imageFile.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="divider">
                  <small>Other required fields</small>
                </div>
                <div className="flex mx-auto form-control w-full my-2">
                  <input
                    type="text"
                    placeholder={"Enter title to display"}
                    className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                    {...register("title")}
                  />
                  {errors.title && <>
                    <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <textarea
                    className={`textarea textarea-bordered w-full ${errors.shortDescription ? 'textarea-error' : ''}`}
                    placeholder="Enter short description"
                    rows={5}
                    {...register("shortDescription")}
                  >
                  </textarea>
                  {errors.shortDescription && <>
                    <FormErrorMessage>{errors.shortDescription.message}</FormErrorMessage>
                  </>}
                </div>
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
