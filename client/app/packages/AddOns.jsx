"use client";

import { useEffect, useState } from 'react';

// App imports
import AddOnCard from '../components/packages/AddOnCard'
import useGetAddOns from '../hooks/packages/useGetAddOns';

export default function AddOns(props) {
  const { addOnsName, addOnsCategory } = props
  const { fetchAddOns, addOns, isLoading, error } = useGetAddOns({ collectionName: "addons", category: addOnsCategory, defaultValue: [] })
  const [_, setState] = useState()

  useEffect(() => {
    async function fetchResources() {
      await fetchAddOns()
    }

    fetchResources()
  }, [_])

  console.log(addOns)

  return (
    <>
      <div className="mt-32 mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12">
        <div className="prose max-w-none">
          <h1 className='m-0 text-center'>
            Add-ons: {' '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>{addOnsName}</span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-8 justify-center mt-10">
          {addOns && addOns?.map((addOn) => (
            <AddOnCard title={addOn.title} price={addOn.price} />
          ))}
        </div>
      </div>
    </>
  )
}
