"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PocketBase from "pocketbase";
import Cookies from 'js-cookie';

export const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
const PocketbaseContext = createContext()

export function PocketbaseContextProvider({children}) {
  return <PocketbaseContext.Provider value={pocketbase}>{children}</PocketbaseContext.Provider>
}

export function usePocketbaseContext() {
  return useContext(PocketbaseContext)
}

const AuthStateContext = createContext()
export function AuthStateContextProvider({ children }) {
  const [authState, setAuthState] = useState(false)
  useEffect(() => {
    const authStateCookie = Cookies.get('pocketbase_auth')
    const authStateLocal = localStorage.getItem('pocketbase_auth')
    if (authStateCookie && authStateLocal) {
      setAuthState(JSON.parse(authStateCookie))
    } else {
      pocketbase.authStore.clear()
      Cookies.remove('pocketbase_auth')
      setAuthState(pocketbase.authStore)
    }
  }, [])

  return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>
}

export function useAuthStateContext() {
  return useContext(AuthStateContext)
}

