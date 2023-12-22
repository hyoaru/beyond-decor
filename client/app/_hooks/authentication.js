import { useState } from "react";
import getClient from "@services/pocketbase/getClient";

export function useAdminLogin() {
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function adminLogin({ email, password }) {
    const response = { data: null, error: null }
    setIsLoading(true)

    try {
      await pocketbase.admins.authWithPassword(email, password)
        .then((authData) => {
          if (authData) {
            response.data = authData
            document.cookie = pocketbase.authStore.exportToCookie({ httpOnly: false })
          }
        })
    } catch (error) {
      response.error = error
    }

    setIsLoading(false)
    return response
  }

  return { adminLogin, isLoading}
}

export function useLogout() {
  function logout() {
    pocketbase.authStore.clear()
    Cookies.remove('pb_auth')
  }

  return { logout }

}