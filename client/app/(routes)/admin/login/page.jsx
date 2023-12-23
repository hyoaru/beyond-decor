"use client";

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

// App imports
import FormErrorMessage from '@components/shared/FormErrorMessage'
import { useAdminLogin } from '@hooks/authentication';
import { LOGIN_ADMIN_BASE_FORM_SCHEMA as formSchema } from '@constants/admin/forms';

export default function Page() {
  const { adminLogin, isLoading } = useAdminLogin()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(data) {
    await adminLogin({ email: data.email, password: data.password })
      .then(({ data, error }) => {
        if (error) {
          if (error.status === 400) {
            toast.error('Invalid credentials.')
          } else {
            toast.error('An error has occured.')
          }
        } else {
          setIsLoggedIn(true)
          toast.success('Redirecting to admin page.')
          window.location.href = '/admin'
        }
      })
  }

  return (
    <>
      <div className="mx-6 my-20 md:my-28 lg:my-40">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="prose max-w-none">
            <h1 className='text-center'>Admin Login</h1>
          </div>
          <div className="mt-6 space-y-4 max-w-lg mx-auto">
            <div className="flex flex-col w-full">
              <input
                type="email"
                name='email'
                placeholder="Email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                {...register('email')}
              />
              {errors.email && <>
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              </>}
            </div>

            <div className="flex flex-col w-full">
              <input
                type="password"
                name='password'
                placeholder="Password"
                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                {...register('password')}
              />
              {errors.password && <>
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              </>}
            </div>
            <div className='flex justify-center'>
              <button type="submit" className='btn px-8' disabled={isLoading | isLoggedIn}>
              {
                  isLoading | isLoggedIn
                    ? <span className='loading loading-ring text-black'></span>
                    : 'Submit'
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
