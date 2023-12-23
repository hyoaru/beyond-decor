import React from 'react'

export default function PackageTab(props) {
  const { title, index, activeIndex, setActiveIndex } = props
  const activeClass = "border border-b-0 bg-primary text-white"
  const isActive = index === activeIndex
  
  return (
    <>
      <a
        className={`tab mb-3 px-4 ${isActive ? activeClass : ''}`}
        onClick={() => setActiveIndex(index)}
        name={index}
      >
        {title}
      </a>
    </>
  )
}
