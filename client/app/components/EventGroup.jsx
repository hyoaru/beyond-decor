"use client";

import React from 'react'
import Image from 'next/image';

// App imports
import AnimationSlideOnShow from '../animations/AnimationSlideOnShow';

export default function EventGroup(props) {
  return (
    <>
      <AnimationSlideOnShow isRightAligned={props.isRightAligned}>
        <div className={"grid grid-cols-1 justify-items-center place-items-center gap-10 sm:grid-cols-2 " + (props.isRightAligned ? "sm:justify-items-end" : "sm:justify-items-start")}>
          <div className={'prose max-w-none text-center order-2 px-8 sm:px-0 sm:w-10/12 sm:text-left ' + (props.isRightAligned ? "sm:text-right sm:order-1" : "sm:text-left")}>
            <h2>{props.title}</h2>
            <p className='sm:text-sm lg:text-base'>{props.description}</p>
          </div>
          <div className={'order-1 ' + (props.isRightAligned ? "sm:order-2" : "")}>
            <Image
              height={300}
              width={800}
              src={props.imageSrc}
              className={'h-[300px] w-[1000px] object-cover rounded-none ' + (props.isRightAligned ? "sm:rounded-tl-xl" : "sm:rounded-tr-xl")}
              alt=""
            />
          </div>
        </div>
      </AnimationSlideOnShow>
    </>
  )
}
