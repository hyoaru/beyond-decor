"use client";

import Image from "next/image"
import AnimationOnHover from "../../animations/AnimationOnHover"

export default function Card(props) {
  return (
    <>
       <div className={"relative " + props.additionalClasses}>
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{props.quotation}</h4>
        </div>

        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <Image
            width={props.width}
            height={props.height}
            src={props.src}
            onLoad={props.onLoad}
            style={{ width: `${props.width}px`, height: `${props.height}px` }}
            alt="" className='rounded-xl object-cover'
          />
        </AnimationOnHover>
      </div>
    </>
  )
}
