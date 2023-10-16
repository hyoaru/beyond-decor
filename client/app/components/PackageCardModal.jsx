"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCollectionRecordUpdate } from '../hooks/backend'
import { useAuthStateContext } from '../context'

export default function PackageCardModal(props) {
  const [imageUrl, setImageUrl] = useState(`${props.src}`)
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate()
  const authState = useAuthStateContext()

  function onImageChange() {
    setImageUrl(URL.createObjectURL(getValues("imageInput")[0]))
  }

  async function onSubmit(data) {
    if (authState.isAdmin) {
      const imageFile = data.imageInput[0]
      const title = data.titleInput
      const description = data.descriptionInput
      const formData = new FormData()

      if (imageFile) { formData.append('image_file', imageFile) }
      if (title) { formData.append('title', title) }
      if (description) { formData.append('description', description) }
      formData.append('position', props.position)

      await collectionRecordUpdate({ collectionName: "package_cards", recordId: props.cardId, formData: formData })
    }

    resetField("titleInput")
    resetField("descriptionInput")
    window.location.href = "/"
  }

  return (
    <>
      <dialog id={props.modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit card contents</h3>
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
                {...register("imageInput", {
                  onChange: onImageChange
                })}
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
              <button onClick={handleSubmit(onSubmit)} className="btn btn-neutral">Save</button>
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
