"use client"

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default function PackageCard(props) {
  const { _package, isAdmin, editModalIdToTrigger, deleteModalIdToTrigger } = props
  const { title, image_path: imgSrc, short_description: description } = _package

  return (
    <>
      <div className="w-[250px]">
        <div className="relative">
          {isAdmin && <>
            <div className="absolute z-10 w-full">
              <div className="dropdown flex dropdown-bottom dropdown-end">
                <label tabIndex={0} className='ms-auto p-2 me-2 cursor-pointer'>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    size='xl'
                    className='shadow-xl text-white'
                  />
                </label>
                <ul tabIndex={0} className="dropdown-content text-xs font-semibold z-[1] menu p-1 shadow bg-base-100 rounded-box w-40 border border-primary">
                  <li><a onClick={() => { document.getElementById(editModalIdToTrigger).showModal() }}>Edit</a></li>
                  <li><a onClick={() => { document.getElementById(deleteModalIdToTrigger).showModal() }}>Delete</a></li>
                </ul>
              </div>
            </div>
          </>}

          <Image
            alt='' src={imgSrc}
            height={250}
            width={350}
            style={{ width: '250px', height: '350px' }}
            className='object-cover rounded-box'
          />
        </div>

        <div className="py-4">
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='text-xs opacity-80'>{description}</p>
        </div>
      </div>
    </>
  )
}
