"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useSupabaseContext, useUserStateContext } from "../context"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

// App import
export default function Header() {
  const supabase = useSupabaseContext()
  const user = useUserStateContext()

  function handleSignOut(event) {
    async function signOut(){
      try {
        const { error } = await supabase.auth.signOut()
      } catch (error) {
        console.log(error)
      }
    }

    event.preventDefault()
    signOut()
    window.location.href="/"
  }

  return (
    <>
      <div className="navbar bg-base-100 border-b pb-0">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/works">Works</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/snap">Snap</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div className="hidden lg:flex">
            <ul className="menu font-thin text-xs menu-horizontal px-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/works">Works</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/snap">Snap</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>


        </div>
        <div className="navbar-center">
          <Link href="/" className="pointer-events-auto normal-case text-xl font-bold">Beyond Decor</Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          {user && <>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </label>
              <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href={"/admin"}>Admin</Link></li>
                <li><input type="submit" onClick={handleSignOut} value={"Sign out"} /></li>
              </ul>
            </div>
          </>}
        </div>
      </div>
    </>
  )
}
