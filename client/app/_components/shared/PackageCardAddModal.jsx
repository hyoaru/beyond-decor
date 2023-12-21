"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// App imports
import { ADD_PACKAGE_FORM_SCHEMA as formSchema } from '@constants/shared/forms'
import useAddPackage from '@hooks/shared/useAddPackage'
import FormErrorMessage from '@components/shared/FormErrorMessage'
import revalidateAllData from '@services/shared/revalidateAllData'

export default function PackageCardAddModal(props) {
  const modalId = "AddPackageCardModal"
  const [imageUrl, setImageUrl] = useState()
  const { addPackage, isLoading } = useAddPackage()

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      price: 0,
      inclusions: '',
      imageFile: '',
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
    document.querySelector('#imageFileInput').value = null
    setImageUrl(null)
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
    await addPackage({
      title: data.title,
      description: data.description,
      shortDescription: data.shortDescription,
      inclusions: data.inclusions,
      price: data.price,
      imageFile: data.imageFile
    })
      .then(async ({ data, error }) => {
        console.log(data)
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
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Add package</h3>
            <div className="my-4">
              {imageUrl && <>
                <Image
                  width={300}
                  height={300}
                  src={imageUrl}
                  style={{ width: `${300}px`, height: `${300}px` }}
                  alt="" className={'rounded-xl object-cover flex mx-auto'}
                />
              </>}

              <div className="">
                <div className="divider">
                  <small className='font-bold text-primary'>Choose thumbnail to upload</small>
                </div>
                <div className="form-control w-full flex mx-auto my-3">
                  <input
                    id='imageFileInput'
                    type="file"
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
                  <input
                    type="number"
                    placeholder={"Enter package price"}
                    className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
                    {...register("price")}
                  />
                  {errors.price && <>
                    <FormErrorMessage>{errors.price.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <textarea
                    className={`textarea textarea-bordered w-full ${errors.inclusions ? 'textarea-error' : ''}`}
                    placeholder="Enter comma separated inclusions e.g: wall backdrop, themed balloons, garland"
                    {...register("inclusions")}
                  >
                  </textarea>
                  {errors.inclusions && <>
                    <FormErrorMessage>{errors.inclusions.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <textarea
                    className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                    placeholder="Enter full description"
                    {...register("description")}
                  >
                  </textarea>
                  {errors.description && <>
                    <FormErrorMessage>{errors.description.message}</FormErrorMessage>
                  </>}

                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <textarea
                    className={`textarea textarea-bordered w-full ${errors.shortDescription ? 'textarea-error' : ''}`}
                    placeholder="Enter short description"
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
              <button onClick={closeAndResetModal} type='button' className="btn">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
