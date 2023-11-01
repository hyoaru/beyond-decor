"use client";

import React, { useEffect, useState } from 'react'

// App imports
import WorkAlbums from './WorkAlbums'
import { useAuthStateContext } from '../../_context';
import useGetWorkAlbums from "../../_hooks/works/useGetWorkAlbums";
import useGetPackages from '../../_hooks/packages/useGetPackages';
import Loading from './loading';

export default function Page() {
  const { fetchWorkAlbums, workAlbums, isLoading, error } = useGetWorkAlbums({ collectionName: "work_albums", defaultValue: [] })
  const { fetchPackages, packages } = useGetPackages({ collectionName: "packages", defaultValue: [] })
  const authState = useAuthStateContext()
  const [_, setState] = useState()

  useEffect(() => {
    fetchWorkAlbums()
    fetchPackages()
  }, [_])

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="grid gap-6 items-center md:grid-cols-2 md:gap-14 lg:gap-24">
          <div className="prose max-w-none text-center md:text-right md:justify-self-end md:prose-lg lg:w-10/12 xl:w-7/12">
            <h1 className='leading-normal md:leading-snug'>
              {"What we've "}
              <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>served</span>
              {" so far"}
            </h1>
          </div>
          <div className="text-center justify-self-start md:text-left lg:w-10/12 xl:w-7/12">
            <p>Beyond Decor delivers with unwavering dedication and creativity. We meticulously craft every detail, curate every experience, and ensure your vision is brought to life. Our team combines expertise with an artful touch, transforming ordinary events into extraordinary memories. </p>
          </div>
        </div>

        {authState.isAdmin && <>
          <div className="text-center mt-10">
            <span
              className="text-primary font-mono opacity-40 text-sm cursor-pointer"
              onClick={() => { document.getElementById('WorkAlbumAddModal').showModal() }}
            >
              {"[ add album ]"}
            </span>
          </div>
        </>}

        {isLoading
          ? <Loading />
          : <WorkAlbums
            workAlbums={workAlbums}
            setState={setState}
            packages={packages}
            />
        }
      </div>

    </>
  )
}
