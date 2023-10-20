"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from "framer-motion"

export default function AnimationFadeOnShow(props) {
  const animationDelay = props.animationDelay ? props.animationDelay : 0.25
  const ref = useRef(null)
  const isInView = useInView(ref)
  const mainControls = useAnimation()
  const initialOpacity = props.initialOpacity ? props.initialOpacity : 0
  const animationOpacity = props.animationOpacity ? props.animationOpacity : 1

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    } else {
      mainControls.start("hidden")
    }
  }, [isInView])

  return (
    <>
      <span ref={ref} style={{ position: "relative", width: "fit-content", overflow: "hidden" }}>
        <motion.span
          variants={{
            hidden: { opacity: initialOpacity },
            visible: { opacity: animationOpacity },
          }}

          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: animationDelay }}
        >
          {props.children}
        </motion.span>
      </span>
    </>
  )
}