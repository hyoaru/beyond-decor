"use client";

import { createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const SupabaseContext = createContext()
export const SupabaseContextProvider = ({ children }) => {
  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}

export const useSupabaseContext = () => {
  return useContext(SupabaseContext)
}


