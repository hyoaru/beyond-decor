import React from 'react'

export default function MetricCard(props) {
  const { label, data } = props
  return (
    <>
      <div className={`grow border rounded-box p-5 px-8`}>
        <div className="flex items-center opacity-60">
          <p className="font-semibold me-auto">{label}</p>
          <p className='font-mono'>{'()'}</p>
        </div>
        <h4 className="font-bold text-2xl mt-1">{data.toLocaleString()}</h4>
      </div>
    </>
  )
}
