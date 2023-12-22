import React from 'react'

export default function FormErrorMessage({ children }) {
  return (
    <>
      <span className='text-error text-xs mt-2'>
        {children}
      </span>
    </>
  )
}
