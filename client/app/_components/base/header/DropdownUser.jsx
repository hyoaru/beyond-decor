"use client"

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// App imports
import useSignOut from "@hooks/authentication/useSignOut"

export default function DropdownUser() {
  const { signOut } = useSignOut()

  function onSignOut() {
    signOut()
    window.location.href = "/admin/login"
  }

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </label>
        <ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
          <li><Link href={"/admin"}>Admin</Link></li>
          <li><input type="submit" onClick={onSignOut} value={"Logout"} /></li>
        </ul>
      </div>
    </>
  )
}
