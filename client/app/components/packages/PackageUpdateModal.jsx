"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../hooks/shared/useCollectionRecordUpdate'

export default function PackageUpdateModal(props) {
  const { packageCard, modalId, setState } = props
  const { id: cardId, title, description, inclusions } = packageCard
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'packages' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: { titleInput: title, descriptionInput: description, inclusionsInput: inclusions.join(", ") }
  })

  async function onSubmit(data) {
    const title = data.titleInput
    const description = data.descriptionInput
    const inclusions = data.inclusionsInput

    const formData = new FormData()
    if (title) { formData.append('title', title) }
    if (description) { formData.append('description', description) }
    if (inclusions) { 
      const inclusionsTrimmed = inclusions.split(",").map((inclusion) => inclusion.trim())
      formData.append('inclusions', JSON.stringify(inclusionsTrimmed)) 
    }

    await collectionRecordUpdate({ recordId: cardId, formData: formData })

    setValue('titleInput', title)
    setValue('descriptionInput', description)
    setValue('inclusionsInput', inclusions)
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit package contents</h3>
          <div className="my-4">
            <div className="">
              <div className="divider">
                <small className='font-bold text-primary'>Required fields</small>
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
                  placeholder="Enter description"
                  {...register("descriptionInput")}
                  rows={4}
                  required
                >
                </textarea>
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter inclusions"
                  {...register("inclusionsInput")}
                  rows={3}
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
