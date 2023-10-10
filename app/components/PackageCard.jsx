import React from 'react'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// App imports
import { useSupabaseContext } from '../context'

export default function PackageCard(props) {
  const user = useSupabaseContext()

  function handleClick() {
    if (user) { document.getElementById(`${props.modalId}`).showModal() }
  }

  return (
    <>
      <div className="relative">
        {user && <>
          <div className="absolute z-50 w-full">
            <FontAwesomeIcon
              icon={faPencil}
              size='lg'
              className='flex ms-auto text-primary bg-white p-2 me-2 mt-2 rounded-xl rounded-tr-none rounded-bl-none opacity-80 cursor-pointer'
              onClick={handleClick}
            />
          </div>
        </>}
        <div className={"card w-64 bg-base-100 shadow-lg"}>
          <figure className='mt-0 mb-0'>
            <img
              src={`${props.src}?${performance.now()}`}
              style={{ width: "300px", height: "200px" }}
              width={300} height={200}
              className='object-cover' alt=""
            />
          </figure>
          <div className="card-body p-6 py-8">
            <h2 className="card-title mt-0 mb-0 text-md">{props.title}</h2>
            <p className='mt-0 text-sm'>{props.description}</p>
          </div>
        </div>


      </div>
    </>
  )
}
