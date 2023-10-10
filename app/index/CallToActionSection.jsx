"use client";

import React from 'react'
import Link from 'next/link'

// App imports
import AnimationFadeOnShow from '../animations/AnimationFadeOnShow';

export default function CallToActionSection() {
  return (
    <>
      <AnimationFadeOnShow initialOpacity={0.3}>
        <div className='prose max-w-none px-10 md:px-20'>
          <h1 className='text-center mb-2 mx-6 '>Let's start crafting your next priceless memory</h1>
          <Link href={"/works"} className='no-underline'>
            <button className="btn btn-primary flex mx-auto mt-6 ">Get a business quote</button>
          </Link>
        </div>
      </AnimationFadeOnShow>
    </>
  )
}
