"use client";

import dayjs from "dayjs";

// App imports
import WorkAlbum from "@components/works/WorkAlbum";
import { useRef, useState } from "react";

export default function WorkAlbumsFeed(props) {
  const { workAlbums, packages, filterBySearchParam } = props
  const [filterBy, setFilterBy] = useState(filterBySearchParam ?? "all")
  const workAlbumTypes = Array.from(new Set(packages.map((_package) => _package?.title)))
  const [_, setState] = useState()

  let filteredWorkAlbums = workAlbums.filter((workAlbum) => {
    return filterBy === "all" ? true : workAlbum.package_type.toLowerCase() === filterBy.toLowerCase()
  })

  function onFilterChange(event) {
    setFilterBy(event.target.value)
  }

  function onSortOrderChange() {
    workAlbums.reverse()
    setState(performance.now())
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
        <div className="flex items-center gap-4">
          <p className="font-bold">Filter by package:</p>
          <select
            className="select select-primary select-bordered select-sm text-primary"
            onChange={onFilterChange}
            value={filterBy}
          >
            <option value={"all"} defaultValue>All</option>
            {workAlbumTypes?.[0] && workAlbumTypes.map((workAlbumType, index) => (
              <option
                key={`workAlbumType-${index}`}
                value={workAlbumType}
              >
                {workAlbumType}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-bold">Sort by date: </p>
          <label className="swap text-sm text-primary">
            <input onChange={onSortOrderChange} type="checkbox" />
            <div className="swap-on">Recent first</div>
            <div className="swap-off">Oldest first</div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-20">
        {filteredWorkAlbums?.[0] && filteredWorkAlbums.map((album, index) => {
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
    </>
  )
}
