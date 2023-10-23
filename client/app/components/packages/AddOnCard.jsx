import React from 'react'

export default function AddOnCard(props) {
  const { addOnId, title, price } = props
  return (
    <>
      <div className="">
        <div className="prose max-w-none text-center p-12 py-8 rounded-xl rounded-tr-none rounded-bl-none border">
          <h2 className='text-primary m-0'>{title}</h2>
          <small className='opacity-80'>{price !== 0 ? `₱ ${price.toLocaleString('en-us')}` : '-'}</small>
        </div>
        <button className="btn btn-primary btn-outline w-full mt-2">Add to bag</button>
      </div>
    </>
  )
}
