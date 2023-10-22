"use client"

import React, { useEffect, useState } from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

// App imports
import useGetWorkAlbum from '@/app/hooks/works/useGetWorkAlbum'
import { useAuthStateContext } from '@/app/context'
import WorkAlbumUpdateModal from '@/app/components/works/WorkAlbumUpdateModal'
import WorkAlbumDeleteModal from '@/app/components/works/WorkAlbumDeleteModal'

export default function page({ params }) {
  const { fetchWorkAlbum, workAlbum, isLoading, error } = useGetWorkAlbum({ recordId: params.id })
  const { id: recordId, event_name: eventName, event_place: eventPlace, event_date: eventDate } = workAlbum
  const { client_name: clientName, thumbnail_path: thumbnailPath, image_paths: imagePaths } = workAlbum
  const formattedEventDate = dayjs(eventDate).format("MMMM DD, YYYY")
  const authState = useAuthStateContext()
  const [_, setState] = useState()

  function onEdit() {
    if (authState.isAdmin) {
      document.getElementById(`WorkAlbumUpdateModal-${recordId}`).showModal()
    }
  }

  async function onDelete() {
    if (authState.isAdmin) {
      document.getElementById(`WorkAlbumDeleteModal-${recordId}`).showModal()
    }
  }

  useEffect(() => {
    async function fetchResource() {
      await fetchWorkAlbum()
    }

    fetchResource()
  }, [_])

  return (
    <>
      <div className="mx-6 my-20">
        <div className="grid gap-6 items-center md:grid-cols-2 md:gap-14 lg:gap-24 my-20">
          <div className="prose max-w-none text-center md:text-right md:justify-self-end md:prose-lg lg:w-10/12 xl:w-8/12">
            <h1 className='md:leading-normal'>
              <span className='p-1 text-white bg-primary rounded-xl rounded-tr-none rounded-bl-none'>{eventName}</span>
            </h1>
          </div>
          <div className="text-center md:justify-self-start md:text-left lg:w-10/12 xl:w-8/12">
            {authState.isAdmin && <>
              <div className="dropdown dropdown-top">
                <label tabIndex={0} className=''>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    size='sm'
                    className='text-primary cursor-pointer'
                  />
                </label>
                <ul tabIndex={0} className="dropdown-content text-xs z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={onEdit}>Edit</a></li>
                  <li><a onClick={onDelete}>Delete</a></li>
                </ul>
              </div>
            </>}
            <p className='font-bold'>{eventPlace}</p>
            <p>{formattedEventDate}</p>
            <p>{clientName}</p>
          </div>
        </div>

        <div className="columns-1 gap-6 md:columns-2">
          {imagePaths && imagePaths.map((imagePath) => (
            <img
              key={`WorkAlbumImage-${uuidv4()}`}
              src={imagePath}
              className='rounded-xl w-full rounded-tr-none rounded-bl-none my-6 shadow-xl'
            />
          ))}
        </div>
      </div>

      {(authState.isAdmin && workAlbum?.thumbnail_path) && <>
        <WorkAlbumUpdateModal
          recordId={recordId}
          setState={setState}
          thumbnailSrc={thumbnailPath}
        />

        <WorkAlbumDeleteModal
          recordId={recordId}
          setState={setState}
          thumbnailSrc={thumbnailPath}
          eventName={eventName}
        />
      </>}
    </>
  )
}
