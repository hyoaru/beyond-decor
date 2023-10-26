"use client";

import { useEffect, useState } from 'react';

// App imports
import AddOnCard from '../components/packages/AddOnCard'
import useGetAddOns from '../hooks/packages/useGetAddOns';
import AddOnsAddModal from '../components/packages/AddOnsAddModal';

export default function AddOns(props) {
  const { isAdmin } = props
  const { fetchAddOns, addOns, isLoading, error } = useGetAddOns({ collectionName: "addons", defaultValue: [] })
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
          <h1 className='m-0 text-center leading-normal'>
            {'Other event upgrades: '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Add-ons</span>
          </h1>
        </div>

        {isAdmin && <>
          <div className="text-center mt-10">
            <span
              className="text-primary font-mono opacity-40 text-sm cursor-pointer"
              onClick={() => { document.getElementById('AddAddOnsModal').showModal() }}
            >
              {"[ add add-ons ]"}
            </span>
          </div>
        </>}

        <div className="grid grid-cols-1 grid-flow-row mt-10 gap-2 lg:grid-cols-2">
          {addOns && addOns?.map((addOn) => (
            <AddOnCard
              key={`AddOn-${addOn.id}`}
              title={addOn.title}
              price={addOn.price}
              category={addOn.category}
            />
          ))}
        </div>
      </div>

      <AddOnsAddModal setState={setState} />
    </>
  )
}
