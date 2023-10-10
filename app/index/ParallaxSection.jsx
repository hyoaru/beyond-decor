"use client";

import Link from 'next/link';
import React from 'react'
import { Parallax } from 'react-parallax';

export default function ParallaxSection() {
  const imagePath = '/ParallaxImage.jpg'

  return (
    <>
      <Parallax bgImage={imagePath} strength={-190} className='hidden xl:block' bgImageStyle={{ objectFit: 'cover' }}>
        <div className='h-[500px] bg-purple-600 opacity-0'></div>
      </Parallax>

      <Parallax bgImage={imagePath} strength={-110} className='hidden lg:block xl:hidden' bgImageStyle={{ objectFit: 'cover' }}>
        <div className='h-[400px] bg-purple-600 opacity-0'></div>
      </Parallax>

      <Parallax bgImage={imagePath} strength={-90} className='hidden md:block lg:hidden' bgImageStyle={{ objectFit: 'cover' }}>
        <div className='h-[300px] bg-purple-600 opacity-0'></div>
      </Parallax>

      <Parallax bgImage={imagePath} strength={-75} className='hidden sm:block md:hidden' bgImageStyle={{ objectFit: "cover" }}>
        <div className='h-[250px] bg-purple-600 opacity-0'></div>
      </Parallax>

      <Parallax bgImage={imagePath} strength={-40} className='sm:hidden' bgImageStyle={{ objectFit: "cover" }}>
        <div className='h-[180px] bg-purple-600 opacity-0'></div>
      </Parallax>
    </>
  )
}
