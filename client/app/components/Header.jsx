"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePocketbaseContext, useAuthStateContext } from "../context"
import { faBagShopping, faUser, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useLogout } from "../hooks/authentication"
import { useBagStore } from "../store/Bag"
import Bag from "./Bag"

// App import
export default function Header() {
  const { mainPackage, addOns, totalCount, removeMainPackage, removeAddOn } = useBagStore()
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
              <Bag
                mainPackage={mainPackage}
                addOns={addOns}
                removeAddOn={removeAddOn}
                removeMainPackage={removeMainPackage}
                totalCount={totalCount}
              />
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
