import React from 'react'

export default function MetricCard(props) {
  const { label, data, className } = props
  return (
    <>
      <div className={`w-[20rem] text-center p-5 border rounded-box ${className}`}>
        <p className="font-bold text-sm text-primary">{label}</p>
        <h1 className="text-4xl font-semibold mt-1">{data.toLocaleString()}</h1>
      </div>
    </>
  )
}
