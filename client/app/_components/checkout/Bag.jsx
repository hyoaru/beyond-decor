"use client"

import Link from 'next/link'

// App imports
import BagItemAddOn from './BagItemAddOn';
import BagItemMainPackage from './BagItemMainPackage';
import { useBagStore } from '@store/Bag';

export default function Bag(props) {
  const { mainPackage, addOns, removeAddOn, removeMainPackage, getTotalPrice } = useBagStore()
  return (
    <>
      <p className='font-bold text-primary mb-2'>Your bag</p>
      <div className="flex flex-col gap-2 w-full h-80 border-t py-1 overflow-y-auto overflow-x-clip mb-2">
        {mainPackage && <>
          <BagItemMainPackage
            mainPackage={mainPackage}
            removeMainPackage={removeMainPackage}
          />
        </>}

        {addOns?.[0] && addOns.map((addOn) => (
          <BagItemAddOn
            key={`CheckoutBagItemAddOn-${addOn.id}`}
            addOn={addOn}
            removeAddOn={removeAddOn}
          />
        ))}
      </div>

      <div className="flex gap-2 md:flex-col lg:flex-row">
        <div className="flex w-full p-3 px-7 items-center rounded-box bg-primary text-white text-lg font-bold">
          <p className="me-auto">Total cost</p>
          <p>₱ {getTotalPrice().toLocaleString()}</p>
        </div>
        <Link href={"/packages"} className="button btn btn-primary btn-outline">Add items</Link>
      </div>
    </>
  )
}
