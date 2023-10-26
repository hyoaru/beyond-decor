import React from 'react'
import { faPen, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ActivePackage(props) {
  const { packageId, title, description, inclusions, isAdmin, editModalIdToTrigger, deleteModalIdToTrigger } = props

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

  return (
    <>
      {isAdmin && <>
        <div className="flex justify-center gap-4 my-10">
          <FontAwesomeIcon
            icon={faPencil}
            size="sm"
            className="text-primary cursor-pointer"
            onClick={onEdit}
          />
          <FontAwesomeIcon
            icon={faTrash}
            size="sm"
            className="text-error cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </>}

      <div className="prose prose-sm sm:prose-md max-w-none mx-auto sm:w-11/12 md:prose-lg lg:w-8/12">
        <div className="divider">
          <h1 className="text-primary m-0 text-center sm:text-left md:mb-3">{title}</h1>
        </div>


        <div className="gap-x-20 grid sm:grid-rows-2 sm:grid-cols-2 md:mb-4 xl:grid-cols-5">
          <div className="mt-5 sm:row-span-2 xl:col-span-2">
            <p className="sm:text-sm m-0 text-center sm:m-0 sm:text-left">{description}</p>
          </div>
          <div className="mt-5 sm:row-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 grid-flow-row list-disc">
              {inclusions.map((inclusion, index) => (
                <li
                  key={`ActivePackage-${packageId}-${index}`}
                  className="sm:text-sm font-semibold text-primary text-center m-0 sm:text-left md:m-0"
                >
                  {inclusion}
                </li>
              ))}
            </div>
          </div>
        </div>

        <div className="divider mt-10">
          <button className="btn btn-primary mx-auto flex">Add to bag</button>

        </div>
      </div>
    </>
  )
}
