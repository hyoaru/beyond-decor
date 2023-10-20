"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../hooks/shared/useCollectionRecordUpdate'

export default function EventServingGroupUpdateModal(props) {
  const { groupId, groupImgSrc, groupPosition, modalId, setState } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'events_serving' })
  const [imageUrl, setImageUrl] = useState(groupImgSrc)

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    const imageFile = data.imageInput[0]
    const title = data.titleInput
    const description = data.descriptionInput

    const formData = new FormData()
    if (imageFile) { formData.append('image_file', imageFile) }
    if (title) { formData.append('title', title) }
    if (description) { formData.append('description', description) }
    formData.append('position', groupPosition)

    await collectionRecordUpdate({ recordId: groupId, formData: formData })

    resetField("titleInput")
    resetField("descriptionInput")
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit group contents</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imageInput", { onChange: onImageChange })}
              />
            </div>

            <div className="flex mx-auto form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter title to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("titleInput")}
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
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
              <button onClick={handleSubmit(onSubmit)} className="btn btn-neutral" disabled={isLoading}>Save</button>
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