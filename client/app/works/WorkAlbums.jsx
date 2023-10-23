"use client";

import { useEffect, useState } from "react";
import useGetWorkAlbums from "../hooks/works/useGetWorkAlbums";
import WorkAlbum from "../components/works/WorkAlbum";
import WorkAlbumAddModal from "../components/works/WorkAlbumAddModal";
import dayjs from "dayjs";

export default function WorkAlbums(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchWorkAlbums, workAlbums, isLoading, error } = useGetWorkAlbums({ defaultValue: [] })

  useEffect(() => {
    async function fetchResources() {
      await fetchWorkAlbums()
    }

    fetchResources()
  }, [_])

  console.log(workAlbums)

  return (
    <>
      <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-20">
        {workAlbums && workAlbums.map((album, index) => {
          const eventDate = album.event_date
          const formattedEventDate = dayjs(eventDate).format("MMMM YYYY")
          return (
            <WorkAlbum
              key={`WorkAlbum-${album.id}`}
              albumId={album.id}
              imgSrc={album.thumbnail_path}
              eventName={album.event_name}
              eventPlace={album.event_place}
              eventDate={formattedEventDate}
            />
          )
        })}
      </div>

      <WorkAlbumAddModal setState={setState} />
    </>
  )
}
