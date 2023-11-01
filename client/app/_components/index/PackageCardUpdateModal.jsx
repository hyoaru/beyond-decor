"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../_hooks/shared/useCollectionRecordUpdate'
import { resizeImage } from '@/app/_libraries/shared/resizeImage'

export default function PackageCardUpdateModal(props) {
  const { packageCard, modalId, setState } = props
  const { id: cardId, image_path: cardImgSrc, title, short_description: shortDescription } = packageCard
  const [imageUrl, setImageUrl] = useState(cardImgSrc)
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'packages' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: { titleInput: title, shortDescriptionInput: shortDescription }
  })

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    try {
      const imageFile = await resizeImage(data.imageInput[0])
      const title = data.titleInput
      const shortDescription = data.shortDescriptionInput

      const formData = new FormData()
      if (imageFile) { formData.append('image_file', imageFile) }
      if (title) { formData.append('title', title) }
      if (shortDescription) { formData.append('short_description', shortDescription) }

      await collectionRecordUpdate({ recordId: cardId, formData: formData })

      setValue('titleInput', title)
      setValue('shortDescriptionInput', shortDescription)
      setState(performance.now())
      document.getElementById(modalId).close()

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit package contents</h3>
          <div className="my-4">
            <img
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
              <div className="form-control w-full max-w-xs flex mx-auto my-3">
                <input
                  type="file"
                  className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                  accept='.jpg, .jpeg, .png'
                  {...register("imageInput", { onChange: onImageChange })}
                  required
                />
              </div>

              <div className="divider">
                <small>Other required fields</small>
              </div>
              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <input
                  type="text"
                  placeholder={"Enter title to display"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("titleInput")}
                  required
                />
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter short description"
                  {...register("shortDescriptionInput")}
                  required
                >
                </textarea>
              </div>
            </div>

          </div>
          <div className="modal-action flex">
            <form>
              <button onClick={handleSubmit(onSubmit)} className="btn btn-primary" disabled={isLoading}>Save</button>
            </form>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
