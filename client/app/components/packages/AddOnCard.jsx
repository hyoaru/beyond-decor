import React from 'react'

export default function AddOnCard(props) {
  const { addOnId, title, price, category } = props
  return (
    <>
      <div className="flex pb-3 pt-2 ps-10 rounded-xl rounded-tr-none rounded-bl-none border w-full">
        <div className="prose max-w-none leading-3 me-auto">
          <h3 className='text-primary m-0 p-0'>{title}</h3>
          <small className='opacity-80'>{category} ・ {price !== 0 ? `₱ ${price.toLocaleString('en-us')}` : '-'}</small>
        </div>
        <button className="btn btn-primary btn-outline h-full me-3">Add to bag</button>
      </div>
    </>
  )
}
