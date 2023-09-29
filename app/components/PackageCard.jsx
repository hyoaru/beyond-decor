import React from 'react'

export default function PackageCard(props) {
  return (
    <>
      <div class="card rounded-xl w-64 bg-base-100 shadow-xl">
        <figure className='mt-0 mb-0'>
          <img
            src={props.src}
            style={{ width: "300px", height: "200px" }}
            width={300} height={200}
            className='object-cover' alt=""
          />
        </figure>
        <div class="card-body p-6">
          <h2 class="card-title mt-0 mb-0 text-md">{props.title}</h2>
          <p className='mt-0 text-sm'>{props.description}</p>
        </div>
      </div>
    </>
  )
}
