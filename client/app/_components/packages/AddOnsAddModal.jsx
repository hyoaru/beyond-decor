"use client"

import { useState } from 'react'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordCreate } from '../../_hooks/shared/useCollectionRecordCreate'

export default function AddOnsAddModal(props) {
  const { nextIndex, setState } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordCreate, isLoading, error } = useCollectionRecordCreate({ collectionName: 'addons' })

  async function onSubmit(data) {
    const title = data.titleInput
    const category = data.categoryInput
    const price = data.priceInput

    if (title && category && price) {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)

      await collectionRecordCreate({ formData: formData })
      setState(performance.now())
      document.getElementById('AddAddOnsModal').close()

    } else {
      alert('Fill up all fields to proceed.')
    }

  }

  return (
    <>
      <dialog id={'AddAddOnsModal'} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Add add-ons</h3>
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
