import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useBagStore } from '@/app/store/Bag'


export default function AddOnCard(props) {
  const { isAdmin, addOnCard, editModalIdToTrigger, deleteModalIdToTrigger } = props
  const { id: addOnId, title, price, category } = addOnCard
  const { addAddOn } = useBagStore()

  function onEdit() {
    if (isAdmin) {
      document.getElementById(editModalIdToTrigger).showModal()
    }
  }

  function onDelete() {
    if (isAdmin) {
      document.getElementById(deleteModalIdToTrigger).showModal()
    }
  }

  function onAddToBag() {
    addAddOn(title)
  }

  return (
    <>
      <div className="flex items-center pb-3 pt-2 ps-10 rounded-xl rounded-tr-none rounded-bl-none border w-full">
        <div className="prose max-w-none leading-3 me-auto">
          <h3 className='text-primary m-0 p-0'>{title}</h3>
          <small className='opacity-80'>{category} ・ {price !== 0 ? `₱ ${price.toLocaleString('en-us')}` : '-'}</small>
        </div>

        {isAdmin && <>
          <div className="dropdown dropdown-bottom">
            <label tabIndex={0} className='mx-6'>
              <FontAwesomeIcon
                icon={faEllipsis}
                size='sm'
                className='text-primary cursor-pointer'
              />
            </label>
            <ul tabIndex={0} className="dropdown-content text-xs z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
              <li><a onClick={onEdit}>Edit</a></li>
              <li><a onClick={onDelete}>Delete</a></li>
            </ul>
          </div>
        </>}

        <button className="btn btn-primary btn-outline h-full me-3" onClick={onAddToBag}>Add to bag</button>
      </div>
    </>
  )
}
