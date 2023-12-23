import Link from "next/link"
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// App imports
import getAuthState from "@services/authentication/getAuthState"
import DropdownBag from "@components/base/header/DropdownBag"
import DropdownUser from "@components/base/header/DropdownUser"
// import { useLogout } from "@hooks/authentication"
//  import { usePocketbaseContext, useAuthStateContext } from "../_context"

export default async function Header() {
  const authState = await getAuthState()

  const navigations = [
    { label: "Home", pathName: "/" },
    { label: "Works", pathName: "/works" },
    { label: "Packages", pathName: "/packages" },
    { label: "About", pathName: "/about" },
  ]

  return (
    <>
      <div className="navbar bg-base-100 border-b pb-0 sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navigations.map((navigation, index) => (
                <li key={`NavigationCollapsed-${index}`}>
                  <Link href={navigation.pathName}>{navigation.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex">
            <div className="flex items-center">
              {navigations.map((navigation, index) => (
                <Link
                  key={`NavigationExpanded-${index}`}
                  className="p-2 rounded-box font-light text-sm btn-ghost"
                  href={navigation.pathName}
                >
                  {navigation.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="navbar-center">
          <Link href="/" className="pointer-events-auto normal-case text-xl font-bold">Beyond Decor</Link>
        </div>

        <div className="navbar-end">
          <Link href={"/checkout"} className="hidden btn btn-primary btn-sm btn-outline text-white me-2 md:flex">Get a quote</Link>
          <DropdownBag />

          {authState?.isAdmin && <>
            <DropdownUser />
          </>}
        </div>
      </div>
    </>
  )
}
