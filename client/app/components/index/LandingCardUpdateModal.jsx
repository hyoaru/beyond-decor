"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../hooks/shared/useCollectionRecordUpdate'

export default function LandingCardUpdateModal(props) {
  const { cardId, cardPosition, cardImgSrc, modalId, setState } = props
  const { register, handleSubmit, getValues, reset, resetField } = useForm()
  const [imageUrl, setImageUrl] = useState(cardImgSrc)
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'landing_cards' })

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    const imageFile = data.imageInput[0]
    const quotation = data.quotationInput

    const formData = new FormData()
    if (imageFile) { formData.append('image_file', imageFile) }
    if (quotation) { formData.append('quotation', quotation) }
    formData.append('position', cardPosition)

    await collectionRecordUpdate({ formData: formData, recordId: cardId })
    resetField('quotationInput')
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal">
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
