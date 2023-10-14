"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)
const supabase = createClientComponentClient()

const SupabaseContext = createContext()
export const SupabaseContextProvider = ({ children }) => {
  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}

export const useSupabaseContext = () => {
  return useContext(SupabaseContext)
}

const UserStateContext = createContext()
export function UserStateContextProvider({ children }) {
  const [userState, setUserState] = useState(false)
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data, error } = await supabase.auth.refreshSession()
        const { session, user } = data
        if (user) { setUserState(user) }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])
  return <UserStateContext.Provider value={userState}>{children}</UserStateContext.Provider>
}

export const useUserStateContext = () => {
  return useContext(UserStateContext)
}

