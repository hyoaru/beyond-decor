"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

// App imports
import PackageCards from './PackageCards';
import AnimationFadeOnShow from '../animations/AnimationFadeOnShow';
import { useAuthStateContext } from '../context';
import AddPackageCardModal from '../components/AddPackageCardModal';
import { usePackageCards } from '../hooks/landing';

export default function PackagesSection() {
  const [packageCards, setPackageCards] = useState([])
  const { getPackageCards, isLoading, error } = usePackageCards()
  const authState = useAuthStateContext()

  function handleAddPackageCard() {
    if (authState.isValid) { document.getElementById('AddPackageCardModal').showModal() }
  }

  async function fetchPackageCards() {
    setPackageCards(await getPackageCards())
  }

  useEffect(() => {
    fetchPackageCards()
  }, [])

  return (
    <>
      <div className="prose max-w-none py-10 md:px-20">
        <h1 className="text-center mx-6 mb-4 leading-relaxed">
          A glimpse of our {' '}
          <AnimationFadeOnShow initialOpacity={0.3}>
            <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>selection</span>
          </AnimationFadeOnShow>
        </h1>
        <p className='text-center px-8 xl:px-36'>We invite you to dream big and let our creativity take your event to new heights. With us, your event is not just an occasion; it's a canvas on which we paint unforgettable memories with the brush of creativity. Welcome to a world where imagination knows no bounds, where every event is a masterpiece waiting to be unveiled.</p>
      </div>

      {authState.isValid && <>
        <div className="flex">
          <small
            className='font-mono text-center text-primary opacity-40 mx-auto cursor-pointer mb-10'
            onClick={handleAddPackageCard}
          >
            {'[ add package ]'}
          </small>
        </div>
      </>}

      <PackageCards packageCards={packageCards}/>

      <Link href="/works" className='no-underline'>
        <button className="btn flex mx-auto mt-16 btn-outline">View Packages</button>
      </Link>

      <AddPackageCardModal nextIndex={packageCards.length}/>
    </>
  )
}
