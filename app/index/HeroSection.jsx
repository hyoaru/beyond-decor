"use client";

import Link from 'next/link';
import React from 'react'

// App imports
import AnimationFadeOnShow from '../animations/AnimationFadeOnShow';

export default function HeroSection() {
  return (
    <>
      <div className='prose max-w-none py-10 md:px-20'>
        <h1 className='text-center mx-6 mb-4 leading-relaxed'>
          Turning events into {' '}
          <AnimationFadeOnShow initialOpacity={0.3}>
            <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>priceless memories</span>
          </AnimationFadeOnShow>
        </h1>
        <p className='text-center px-8 xl:px-36'>Picture a realm where every aspect, every flavor, and every instant is intricately fashioned to transform your occasion into an enduring treasure. This is the essence of Beyond Decor. With an unwavering dedication to perfection and an enduring commitment to excellence, we stand by your side in the art of crafting unforgettable moments.</p>
        <Link href="/works" className='no-underline'>
          <button className="btn btn-outline mt-8 flex mx-auto rounded-xl rounded-tr-none rounded-bl-none">See for yourself</button>
        </Link>
      </div>
    </>
  )
}
