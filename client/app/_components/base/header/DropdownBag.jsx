"use client"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBagShopping } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

// App imports
import { useBagStore } from '@store/Bag'

export default function DropdownBag() {
  const { mainPackage, addOns, totalCount, removeMainPackage, removeAddOn } = useBagStore()

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-sm">
          <div className="indicator">
            <FontAwesomeIcon icon={faBagShopping} size="lg" />
            <span className="badge badge-xs badge-primary indicator-item">{totalCount()}</span>
          </div>
        </label>

        <div tabIndex={0} className="dropdown-content z-[1] card card-compact p-2 mt-1 w-72 border bg-base-100 border-primary">
          <div className="card-body">
            <h3 className="uppercase text-center text-lg font-bold opacity-80">Your bag</h3>
            <div className="border border-dashed mb-2"></div>
            <div className="ms-2 pe-2 h-32 overflow-y-auto">
              {mainPackage && <>
                <div className="flex items-center">
                  <p className="font-bold text-lg me-auto text-primary">{mainPackage.title}</p>
                  <FontAwesomeIcon
                    icon={faX}
                    size="lg"
                    className="text-error cursor-pointer"
                    onClick={removeMainPackage}
                  />
                </div>
              </>}

              {addOns && addOns.map((addOn) => (
                <div key={`AddOnsBagItem-${addOn.id}`} className="flex items-center">
                  <p className="text-lg me-auto">{addOn.title}</p>
                  <FontAwesomeIcon
                    icon={faX}
                    size="lg"
                    className="text-error cursor-pointer"
                    onClick={() => removeAddOn(addOn)}
                  />
                </div>
              ))}

            </div>

            <div className="border border-dashed mb-2"></div>
            <p className="text-center text-primary">{totalCount()} items in bag</p>
          </div>
          <div className="card-actions mb-4 flex justify-center">
            <Link href={"/packages"} className="btn btn-primary btn-sm btn-outline">Add items</Link>
            <Link href={"/checkout"} className="btn btn-primary btn-sm">Get a quote</Link>
          </div>
        </div>
      </div>
    </>
  )
}
