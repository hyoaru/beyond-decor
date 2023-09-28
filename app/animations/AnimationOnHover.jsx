"use client";

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"

export default function AnimationOnHover(props) {
  const mainControls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) {
      mainControls.start("animate")
    } else {
      mainControls.start("initial")
    }
  }, [isHovered])

  return (
    <>
      <span className='relative w-fit overflow-hidden'>
        <motion.span
          variants={{
            initial: props.initial,
            animate: props.animate
          }}

          initial="initial"
          animate={mainControls}
          transition={{duration: 0.1}}
          onHoverStart={() => {setIsHovered(true)}}
          onHoverEnd={() => {setIsHovered(false)}}
        >
          {props.children}
        </motion.span>
      </span>
    </>
  )
}
