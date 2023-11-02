"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'

// App imports
import { useCollectionRecordUpdate } from '../../_hooks/shared/useCollectionRecordUpdate'
import { resizeImage } from '@/app/_libraries/shared/resizeImage'

export default function EventServingGroupUpdateModal(props) {
  const { eventServingGroup, modalId, setState } = props
  const { id: groupId, image_path: groupImgSrc, title, description } = eventServingGroup
  const [imageUrl, setImageUrl] = useState(groupImgSrc)
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'events_serving' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: { titleInput: title, descriptionInput: description }
  })

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    try {
      const imageFile = data.imageInput[0]
      const title = data.titleInput
      const description = data.descriptionInput
  
      const formData = new FormData()
      if (imageFile) { formData.append('image_file', await resizeImage(imageFile)) }
      if (title) { formData.append('title', title) }
      if (description) { formData.append('description', description) }
  
      await collectionRecordUpdate({ recordId: groupId, formData: formData })
  
      setValue("titleInput", title)
      setValue("descriptionInput", description)
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
          <h3 className="font-bold text-lg mt-4">Edit group contents</h3>
          <div className="my-4">
            <Image
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
            <div className="divider">
              <small className="text-primary font-bold">Choose thumbnail to upload</small>
            </div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imageInput", { onChange: onImageChange })}
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
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs my-2">
              <textarea
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Enter description to display"
                {...register("descriptionInput")}
              >
              </textarea>
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
