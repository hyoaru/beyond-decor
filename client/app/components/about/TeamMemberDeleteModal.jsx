"use client"

import { useState } from 'react'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordDelete } from '../../hooks/shared/useCollectionRecordDelete'

export default function TeamMemberDeleteModal(props) {
  const { recordId, memberName, imgSrc, setState, modalId } = props
  const { collectionRecordDelete, isLoading, error } = useCollectionRecordDelete({ collectionName: 'team_members' })
  const [imageUrl, setImageUrl] = useState(imgSrc)

  async function onSubmit(data) {
    await collectionRecordDelete({ recordId: recordId })
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Delete member</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />

            <div className="prose max-w-none text-center my-6">
              <h2>{memberName}</h2>
            </div>

          </div>
          <div className="modal-action flex">
            <form>
              <button onClick={onSubmit} className="btn btn-error" disabled={isLoading}>Delete</button>
            </form>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
