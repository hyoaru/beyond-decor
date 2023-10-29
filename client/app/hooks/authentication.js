import PocketBase from "pocketbase";
import { useState } from "react";
import Cookies from "js-cookie";

const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

export function useAdminLogin() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function adminLogin({ email, password }) {
    setIsLoading(true)
    try {
      const authData = await pocketbase
        .admins
        .authWithPassword(email, password)

      if (authData) {
        document.cookie = pocketbase.authStore.exportToCookie({httpOnly: false})
        setIsLoggedIn(true)
      }

    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { adminLogin, isLoggedIn, isLoading, error }
}

export function useLogout() {
  function logout() {
    pocketbase.authStore.clear()
    Cookies.remove('pocketbase_auth')
  }

  return { logout }

}