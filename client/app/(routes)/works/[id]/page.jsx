"use client"

import React, { useEffect, useState } from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

// App imports
import useGetWorkAlbum from '@/app/_hooks/works/useGetWorkAlbum'
import { useAuthStateContext } from '@/app/_context'
import WorkAlbumUpdateModal from '@/app/_components/works/WorkAlbumUpdateModal'
import WorkAlbumDeleteModal from '@/app/_components/works/WorkAlbumDeleteModal'
import useGetPackages from '@/app/_hooks/packages/useGetPackages'
import Loading from '../loading'
import { notFound } from 'next/navigation'

export default function Page({ params }) {
  const { fetchWorkAlbum, workAlbum, isLoading, error } = useGetWorkAlbum({ recordId: params.id })
  const { fetchPackages, packages } = useGetPackages({ collectionName: "packages", defaultValue: [] })
  const { id: recordId, event_name: eventName, event_place: eventPlace, event_date: eventDate } = workAlbum
  const { client_name: clientName, thumbnail_path: thumbnailPath, image_paths: imagePaths } = workAlbum
  const formattedEventDate = dayjs(eventDate).format("MMMM DD, YYYY")
  const authState = useAuthStateContext()
  const [_, setState] = useState()

  useEffect(() => {
    fetchWorkAlbum()
    fetchPackages()
  }, [_])

  if (isLoading) {
    return (<Loading />)
  }

  if (!isLoading && !workAlbum) {
    return (notFound())
  }

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

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
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
                <ul tabIndex={0} className="dropdown-content text-xs z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
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
            <Image
              key={`WorkAlbumImage-${uuidv4()}`}
              src={imagePath}
              width={650}
              height={650}
              className='rounded-xl w-full rounded-tr-none rounded-bl-none my-6 shadow-xl'
              alt=''
            />
          ))}
        </div>
      </div>

      {(authState.isAdmin && workAlbum?.thumbnail_path) && <>
        <WorkAlbumUpdateModal
          workAlbum={workAlbum}
          packages={packages}
          setState={setState}
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
