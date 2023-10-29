"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePocketbaseContext, useAuthStateContext } from "../context"
import { faBagShopping, faUser, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useLogout } from "../hooks/authentication"
import { useBagStore } from "../store/Bag"

// App import
export default function Header() {
  const { packages, addOns, totalCount, removePackage, removeAddOn } = useBagStore()
  const authState = useAuthStateContext()
  const { logout } = useLogout()

  useEffect(() => {
  }, [authState])

  function handleLogout(event) {
    logout()
    window.location.href = "/admin/login"
  }

  return (
    <>
      <div className="navbar bg-base-100 border-b pb-0 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/works">Works</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div className="hidden lg:flex">
            <ul className="menu font-thin text-xs menu-horizontal px-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/works">Works</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>


        </div>
        <div className="navbar-center">
          <Link href="/" className="pointer-events-auto normal-case text-xl font-bold">Beyond Decor</Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <div className="indicator">
                <FontAwesomeIcon icon={faBagShopping} size="lg" />
                <span className="badge badge-xs badge-primary indicator-item">{totalCount()}</span>
              </div>
            </label>
            <div tabIndex={0} className="dropdown-content z-[1] card card-compact p-2 w-80 border bg-base-100 border-primary">
              <div className="card-body">
                <h3 className="uppercase text-center text-lg font-bold opacity-80">Your bag</h3>
                <div className="border border-dashed mb-2"></div>
                <div className="mx-2">
                  {packages && <>
                    <div className="flex items-center">
                      <p className="font-bold text-lg me-auto text-primary">{packages}</p>
                      <FontAwesomeIcon
                        icon={faX}
                        size="lg"
                        className="text-error cursor-pointer"
                        onClick={removePackage}
                      />
                    </div>
                  </>}

                  {addOns && addOns.map((addOn) => (
                    <div key={`AddOnsBagItem-${addOn}`} className="flex items-center">
                      <p className="text-lg me-auto">{addOn}</p>
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
                <button className="btn btn-primary btn-sm">Get a quote</button>
              </div>
            </div>
          </div>

          {(authState?.isValid) && <>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </label>
              <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
                <li><Link href={"/admin"}>Admin</Link></li>
                <li><input type="submit" onClick={handleLogout} value={"Logout"} /></li>
              </ul>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}
