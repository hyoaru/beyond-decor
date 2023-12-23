import React from 'react'

export default function Loading() {
  return (
    <>
      <div className="h-[80svh] w-full">
        <div className="flex h-full w-full">
          <span className="mx-auto my-auto loading loading-ring loading-lg scale-[1.5]"></span>
        </div>
      </div>
    </>
  )
}
