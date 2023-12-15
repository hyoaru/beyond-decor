import getClient from "@services/pocketbase/getClient";
import Cookies from "js-cookie";

export default function useSignOut() {
  const pocketbase = getClient()

  function signOut() {
    pocketbase.authStore.clear()
    Cookies.remove('pb_auth')
  }

  return { signOut }
}