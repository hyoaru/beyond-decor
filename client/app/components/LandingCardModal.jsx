"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useAuthStateContext } from '../context'
import { useCollectionRecordUpdate } from '../hooks/backend'

export default function LandingCardModal(props) {
  const authState = useAuthStateContext()
  const { register, handleSubmit, getValues, reset, resetField } = useForm()
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate()
  const [imageUrl, setImageUrl] = useState(`${props.src}`)

  function onImageChange() {
    setImageUrl(URL.createObjectURL(getValues("imageInput")[0]))
  }

  async function onSubmit(data) {
    if (authState.isAdmin) {
      const imageFile = data.imageInput[0]
      const quotation = data.quotationInput
      const recordId = props.id
      const isRecordLocal = props.isLocal
      const position = props.position
      const formData = new FormData()

      if (imageFile) { formData.append('image_file', imageFile) }
      if (quotation) { formData.append('quotation', quotation) }
      formData.append('position', position)
      await collectionRecordUpdate({ collectionName: "landing_cards", recordId: recordId, formData: formData })
    }

    resetField('quotationInput')
    window.location.href = "/"
  }

  return (
    <>
      <dialog id={props.modalID} className="modal">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg">Edit card contents</h3>
          <div className="my-4">
            <img
              width={300}
              height={450}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${450}px` }}
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

            <div className="flex mx-auto">
              <input
                type="text"
                placeholder={"Enter quotation to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("quotationInput")}
              />
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
