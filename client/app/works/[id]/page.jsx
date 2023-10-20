"use client"

import useGetWorkAlbum from '@/app/hooks/works/useGetWorkAlbum'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

export default function page({ params }) {
  const { fetchWorkAlbum, workAlbum, isLoading, error } = useGetWorkAlbum({ recordId: params.id })
  const { event_name: eventName, event_place: eventPlace, event_date: eventDate } = workAlbum
  const { client_name: clientName, thumbnail_path: thumbnailPath, image_paths: imagePaths } = workAlbum
  const formattedEventDate = dayjs(eventDate).format("MMMM DD, YYYY")
  const [_, setState] = useState()

  useEffect(() => {
    async function fetchResource() {
      await fetchWorkAlbum()
    }

    fetchResource()
  }, [_])

  console.log(eventName)

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
            <p className='font-bold'>{eventPlace}</p>
            <p>{formattedEventDate}</p>
            <p>{clientName}</p>
          </div>
        </div>

        <div className="columns-1 gap-6 md:columns-2">
            {imagePaths && imagePaths.map((imagePath) => (
              <img src={imagePath} className='rounded-xl w-full rounded-tr-none rounded-bl-none my-6 shadow-xl' alt="" />
            ))}
        </div>
      </div>
    </>
  )
}
