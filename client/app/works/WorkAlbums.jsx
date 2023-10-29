"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

// App imports
import WorkAlbum from "../components/works/WorkAlbum";
import WorkAlbumAddModal from "../components/works/WorkAlbumAddModal";
import useQueryParams from "../hooks/shared/useQueryParams";
import { useRef, useState } from "react";

export default function WorkAlbums(props) {
  const { workAlbums, packages, isAdmin, setState } = props
  const { urlSearchParams, router, pathname } = useQueryParams()
  const [filterBy, setFilterBy] = useState(urlSearchParams.get("filterBy") || "none")
  const [sortOrder, setSortOrder] = useState()
  const workAlbumTypes = Array.from(new Set(workAlbums?.map((workAlbum) => workAlbum.package_type)))

  let filteredWorkAlbums = workAlbums
  if (filterBy !== "none") {
    filteredWorkAlbums = workAlbums.filter((workAlbum) => (
      workAlbum.package_type.toLowerCase() === filterBy.toLowerCase()
    ))
  }

  function onFilterChange(event) {
    if (urlSearchParams.get("filterBy")) {
      urlSearchParams.delete("filterBy")
      router.replace(pathname)
    }

    setFilterBy(event.target.value)
  }

  function onSortOrderChange(event) {
    if (urlSearchParams.get("sortOrder")) {
      urlSearchParams.delete("sortOrder")
      router.replace(pathname)
    }

    filteredWorkAlbums.reverse()
    setSortOrder(event.target.checked ? "asc" : "desc")
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
            <option value={"none"} defaultValue>None</option>
            {workAlbumTypes.map((workAlbumType, index) => (
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
        {filteredWorkAlbums && filteredWorkAlbums.map((album, index) => {
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

      <WorkAlbumAddModal setState={setState} packages={packages} />
    </>
  )
}
