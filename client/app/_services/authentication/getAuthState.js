"use server"

import getClient from "@services/pocketbase/getClient"
import { cookies } from "next/headers"

export default async function getAuthState() {
  const pocketbase = getClient()
  const authStateCookie = cookies()?.get('pb_auth')?.value
  
  if (authStateCookie) {
    const authStateCookieParsed = JSON.parse(authStateCookie)
    pocketbase.authStore.save(authStateCookieParsed.token, authStateCookieParsed.model)
  } else {
    pocketbase.authStore.clear()
  }

  return pocketbase.authStore
}