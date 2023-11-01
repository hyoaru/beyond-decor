"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../_hooks/shared/useCollectionRecordUpdate'

export default function AddOnsUpdateModal(props) {
  const { addOnCard, modalId, setState } = props
  const { id: cardId, title, category, price } = addOnCard
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'addons' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: { titleInput: title, categoryInput: category, priceInput: price }
  })

  async function onSubmit(data) {
    const title = data.titleInput
    const category = data.categoryInput
    const price = data.priceInput

    const formData = new FormData()
    if (title) { formData.append('title', title) }
    if (category) { formData.append('category', category) }
    if (price) { formData.append('price', price) }

    await collectionRecordUpdate({ recordId: cardId, formData: formData })

    setValue('titleInput', title)
    setValue('categoryInput', category)
    setValue('priceInput', price)
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit addon</h3>
          <div className="my-4">
            <div className="">
              <div className="divider">
                <small className='text-primary font-bold'>Required fields</small>
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
                <input
                  type="text"
                  placeholder={"Enter category"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("categoryInput")}
                  required
                />
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <input
                  type="number"
                  placeholder={"Enter price"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("priceInput")}
                  required
                />
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
