import React from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// App imports
import { useAuthStateContext } from '../context'
import { useCollectionRecordDelete } from '../hooks/backend'

export default function PackageCard(props) {
  const {collectionRecordDelete, isLoading, error} = useCollectionRecordDelete()
  const authState = useAuthStateContext()

  function handleEdit() {
    if (authState.isAdmin) { document.getElementById(`${props.modalId}`).showModal() }
  }

  async function handleDelete() {
    if (authState.isAdmin) {
      await collectionRecordDelete({collectionName: "package_cards", recordId: props.cardId})
      window.location.href="/"
    }
  }

  return (
    <>
      <div className="relative">
        {authState.isAdmin && <>
          <div className="absolute z-50 w-full">
            <div className="dropdown flex dropdown-bottom dropdown-end opacity-80">
              <label tabIndex={0} className='ms-auto p-2 me-2 mt-1'>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  size='xl'
                  className='shadow-xl text-white'
                />
              </label>
              <ul tabIndex={0} className="dropdown-content text-xs font-semibold z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={handleEdit}>Edit</a></li>
                <li><a onClick={handleDelete}>Delete</a></li>
              </ul>
            </div>
          </div>
        </>}
        <div className={"card w-64 bg-base-100 shadow-lg"}>
          <figure className='mt-0 mb-0'>
            <img
              src={`${props.src}`}
              style={{ width: "300px", height: "200px" }}
              width={300} height={200}
              className='object-cover' alt=""
            />
          </figure>
          <div className="card-body p-6 py-8">
            <h2 className="card-title mt-0 mb-0 text-md">{props.title}</h2>
            <p className='mt-0 text-sm'>{props.description}</p>
          </div>
        </div>


      </div>
    </>
  )
}
