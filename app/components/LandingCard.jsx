"use client";

import Image from "next/image"
import AnimationOnHover from "../animations/AnimationOnHover"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export default function LandingCard(props) {
  const [quotation, setQuotation] = useState(" ")

  return (
    <>
      <div className="relative hidden xl:block">
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{quotation}</h4>
        </div>

        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <Image
            width={200}
            height={450}
            src={props.src}
            onLoad={() => {setQuotation(props.quotation)}}
            style={{ width: "200px", height: "450px" }}
            alt="" className='rounded-xl object-cover'
          />
        </AnimationOnHover>
      </div>

      <div className="relative hidden md:block xl:hidden">
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{quotation}</h4>
        </div>
        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <Image
            width={400}
            height={250}
            src={props.src}
            onLoad={() => {setQuotation(props.quotation)}}
            style={{ width: "400px", height: "250px" }}
            alt="" className='rounded-xl object-cover'
          />
        </AnimationOnHover>
      </div>

      <div className="relative md:hidden">
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{quotation}</h4>
        </div>

        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <Image
            width={250}
            height={600}
            src={props.src}
            onLoad={() => {setQuotation(props.quotation)}}
            style={{ width: "250px", height: "600px" }}
            alt="" className='rounded-xl object-cover'
          />
        </AnimationOnHover>
      </div>

    </>
  )
}