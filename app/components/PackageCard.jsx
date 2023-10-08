import React from 'react'
import { useSupabaseContext } from '../context'

export default function PackageCard(props) {
  const user = useSupabaseContext()

  function handleClick() {
    if (user) { document.getElementById(`${props.modalId}`).showModal() }
  }

  return (
    <>
      <div className={user ? "card rounded-xl w-64 bg-base-100 shadow-xl cursor-pointer" : "card rounded-xl w-64 bg-base-100 shadow-xl"} onClick={handleClick}>
        <figure className='mt-0 mb-0'>
          <img
            src={`${props.src}?${performance.now()}`}
            style={{ width: "300px", height: "200px" }}
            width={300} height={200}
            className='object-cover' alt=""
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title mt-0 mb-0 text-md">{props.title}</h2>
          <p className='mt-0 text-sm'>{props.description}</p>
        </div>
      </div>
    </>
  )
}
