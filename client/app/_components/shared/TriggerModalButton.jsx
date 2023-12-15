"use client"

import React from 'react'

export default function TriggerModalButton(props) {
  const { modalIdToTrigger, children, className } = props

  return (
    <>
      <small
        className={`font-mono text-primary opacity-40 cursor-pointer ${className}`}
        onClick={() => { document.getElementById(modalIdToTrigger).showModal() }}
      >
        {children}
      </small>
    </>
  )
}
