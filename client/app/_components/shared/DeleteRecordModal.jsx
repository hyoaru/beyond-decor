"use client"

import React from 'react'

// App imports
import revalidateAllData from '@services/shared/revalidateAllData'
import useDeleteRecord from '@hooks/shared/useDeleteRecord'

export default function DeleteRecordModal(props) {
  const { modalId, collectionName, recordId } = props
  const { deleteRecord, isLoading } = useDeleteRecord()

  function closeModal() {
    document.getElementById(modalId).close()
  }

  async function onSubmit(event) {
    event.preventDefault()
    await deleteRecord({ collectionName: collectionName, recordId: recordId })
      .then(async ({ data, error }) => {
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
      <dialog id={modalId} className="modal">
        <div className="modal-box max-w-md">
          <form onSubmit={onSubmit}>
            <h3 className="font-bold text-lg">Are you absolutely sure?</h3>
            <p className="py-4 text-sm">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
            <div className="modal-action flex">
              <button type='submit' className="btn btn-error" disabled={isLoading}>Continue</button>
              <button onClick={closeModal} type='button' className='btn'>close</button>
            </div>
          </form>
        </div>
      </dialog >
    </>
  )
}
