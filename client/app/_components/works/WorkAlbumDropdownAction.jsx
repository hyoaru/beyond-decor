"use client"

import React from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function WorkAlbumAction(props) {
  const { recordId } = props

  function onEdit() {
    document.getElementById(`WorkAlbumUpdateModal-${recordId}`).showModal()
  }

  async function onDelete() {
    document.getElementById(`WorkAlbumDeleteModal-${recordId}`).showModal()
  }

  return (
    <>
      <div className="dropdown dropdown-top">
        <label tabIndex={0} className=''>
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
    </>
  )
}
