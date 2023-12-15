import React from 'react'

export default function FormErrorMessage({ children }) {
  return (
    <>
      <span className='text-error text-sm mt-2'>
        {children}
      </span>
    </>
  )
}
