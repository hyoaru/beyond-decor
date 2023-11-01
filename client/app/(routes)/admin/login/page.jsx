"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';

// App imports
import { useAdminLogin } from '@/app/_hooks/authentication';

export default function page() {
  const { register, handleSubmit, reset, resetField } = useForm()
  const { adminLogin, isLoggedIn, isLoading, error } = useAdminLogin()

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href="/admin"
    }
  }, [isLoggedIn])

  async function onSubmit(data) {
    await adminLogin({ email: data.email, password: data.password })
  }

  return (
    <>
      <div className="mx-6 my-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="prose max-w-none">
            <h1 className='text-center'>Admin Login</h1>
          </div>
          <div className="flex flex-col mt-6 gap-y-4">

            {isLoading ? <>
              <span className="loading loading-ring loading-lg flex mx-auto"></span>
            </> : <>
              <input
                type="email"
                name='email'
                placeholder="Email"
                className="mx-auto input input-bordered w-full max-w-xs"
                {...register('email')}
              />
              <input
                type="password"
                name='password'
                placeholder="Password"
                className="mx-auto input input-bordered w-full max-w-xs"
                {...register('password')}
              />
            </>}

            {error && <>
              <small className='text-error-content text-center'>{error.message}</small>
            </>}

            <div className='mx-auto'>
              <input type="submit" value="Submit" className='btn' disabled={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
