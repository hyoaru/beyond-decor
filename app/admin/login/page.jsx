"use client";
import React, { useEffect, useRef, useState } from 'react'

// App imports
import { useSupabaseContext } from '@/app/context';

export default function page() {
  let supabase = useSupabaseContext()
  const formData = useRef({})

  function handleChange(event) {
    formData.current.value = { 
      ...formData.current.value, [event.target.name]:event.target.value }
  }

  async function handleSubmit (event) {
    event.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.current.value.email,
        password: formData.current.value.password,
      })

      console.log(data)
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="mx-6 my-16">
        <form>
          <div className="prose max-w-none">
            <h1 className='text-center'>Admin Login</h1>
          </div>
          <div className="flex flex-col mt-6 gap-y-4">
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="mx-auto input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
            <input
              type="password"
              name='password'
              placeholder="Password"
              className="mx-auto input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
            <div className='mx-auto'>
              <input type="submit" value="Submit" className='btn' onClick={handleSubmit}/>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
