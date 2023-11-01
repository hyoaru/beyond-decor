"use client";

import { useEffect, useState } from 'react';

// App imports
import AddOnCard from '../../_components/packages/AddOnCard'
import useGetAddOns from '../../_hooks/packages/useGetAddOns';
import AddOnsAddModal from '../../_components/packages/AddOnsAddModal';
import AddOnsUpdateModal from '../../_components/packages/AddOnsUpdateModal';
import AddOnsDeleteModal from '../../_components/packages/AddOnsDeleteModal';
import Loading from './loading';

export default function AddOns(props) {
  const { isAdmin } = props
  const { fetchAddOns, addOns, isLoading, error } = useGetAddOns({ collectionName: "addons", defaultValue: [] })
  const [_, setState] = useState()

  useEffect(() => {
    fetchAddOns()
  }, [_])

  if (isLoading) { return <Loading /> }

  return (
    <>
      <div className="mt-32 mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12">
        <div className="prose prose-sm sm:prose-md md:prose-lg max-w-none">
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
              addOnCard={addOn}
              editModalIdToTrigger={`AddOnUpdateModal-${addOn.id}`}
              deleteModalIdToTrigger={`AddOnDeleteModal-${addOn.id}`}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>

      <AddOnsAddModal setState={setState} />

      {(isAdmin && addOns) && addOns?.map((addOn) => (
        <div key={`AddOnsModifyModals-${addOn.id}`}>
          <AddOnsUpdateModal
            modalId={`AddOnUpdateModal-${addOn.id}`}
            addOnCard={addOn}
            setState={setState}
          />

          <AddOnsDeleteModal
            modalId={`AddOnDeleteModal-${addOn.id}`}
            addOnCard={addOn}
            setState={setState}
          />
        </div>
      ))}
    </>
  )
}
