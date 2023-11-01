import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <>
      <div className="h-[60svh] flex">
        <div className="prose text-center my-auto mx-auto">
          <p className='m-0 text-error font-bold'>There was a problem</p>
          <h1>We could not find the page you were looking for</h1>
          <Link href={"/"} className='btn btn-primary btn-outline'>Back to home</Link>
        </div>
      </div>
    </>
  )
}
