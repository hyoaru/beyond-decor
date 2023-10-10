"use client";

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion';

export default function AnimationSlideOnShow(props) {
  const animationDelay = props.animationDelay ? props.animationDelay : 0.25
  const ref = useRef(null)
  const isInView = useInView(ref)
  const mainControls = useAnimation()
  const xTransform = props.isRightAligned ? "2vw" : "-2vw"

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate")
    } else {
      mainControls.start("initial")
    }
  }, [isInView])

  return (
    <>
      <span ref={ref} style={{ position: "relative", width: "fit-content", overflow: "hidden" }}>
        <motion.div
          variants={{
            initial: { opacity: 0, x: xTransform },
            animate: { opacity: 1, x: 0 },
          }}

          initial="initial"
          animate={mainControls}
          transition={{ duration: 0.5, opacity: {duration: 1.5}}}
        >
          {props.children}
        </motion.div>
      </span>
    </>
  )
}
