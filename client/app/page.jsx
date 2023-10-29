"use client";

export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import Link from 'next/link';

// App imports
import LandingCards from './index/LandingCards'
import PackageCards from './index/PackageCards'
import ParallaxSection from './index/ParallaxSection';
import EventServingGroups from './index/EventServingGroups';
import AnimationFadeOnShow from './animations/shared/AnimationFadeOnShow';
import { useAuthStateContext } from './context';

export default function Home() {
  const authState = useAuthStateContext()

  return (
    <>
      <div className="mx-6 mt-2 md:mt-8">
        <LandingCards isAdmin={authState.isAdmin} />
      </div>


      {/* Hero section */}
      <div className="mt-10 lg:mt-32">
        <div className='prose max-w-none py-10 md:px-20'>
          <h1 className='text-center mx-6 mb-4 leading-relaxed'>
            Turning events into {' '}
            <AnimationFadeOnShow initialOpacity={0.3}>
              <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>priceless memories</span>
            </AnimationFadeOnShow>
          </h1>
          <p className='text-center px-8 xl:px-36'>Picture a realm where every aspect, every flavor, and every instant is intricately fashioned to transform your occasion into an enduring treasure. This is the essence of Beyond Decor. With an unwavering dedication to perfection and an enduring commitment to excellence, we stand by your side in the art of crafting unforgettable moments.</p>
          <Link href="/works" className='no-underline'>
            <button className="btn btn-outline mt-8 flex mx-auto rounded-xl rounded-tr-none rounded-bl-none">See for yourself</button>
          </Link>
        </div>
      </div>


      {/* Parallax section */}
      <div className="mt-20 lg:mt-32">
        <ParallaxSection />
      </div>


      {/* Packages section */}
      <div className="mt-10 lg:mt-32">
        <div className="prose max-w-none py-10 md:px-20">
          <h1 className="text-center mx-6 mb-4 leading-relaxed">
            A glimpse of our {' '}
            <AnimationFadeOnShow initialOpacity={0.3}>
              <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>selection</span>
            </AnimationFadeOnShow>
          </h1>
          <p className='text-center px-8 xl:px-36'>We invite you to dream big and let our creativity take your event to new heights. With us, your event is not just an occasion; it's a canvas on which we paint unforgettable memories with the brush of creativity. Welcome to a world where imagination knows no bounds, where every event is a masterpiece waiting to be unveiled.</p>
        </div>

        {authState.isAdmin && <>
          <div className="flex">
            <small
              className='font-mono text-center text-primary opacity-40 mx-auto cursor-pointer mb-10'
              onClick={() => { document.getElementById('AddPackageCardModal').showModal() }}
            >
              {'[ add package ]'}
            </small>
          </div>
        </>}

        <PackageCards isAdmin={authState.isAdmin} />

        <Link href="/works" className='no-underline'>
          <button className="btn flex mx-auto mt-16 btn-outline">View Packages</button>
        </Link>
      </div>


      {/* Events serving section */}
      <div className="mt-32 lg:mt-48">
        <EventServingGroups isAdmin={authState.isAdmin} />
      </div>


      {/* Call to action section */}
      <div className="my-40 lg:my-48">
        <AnimationFadeOnShow initialOpacity={0.3}>
          <div className='prose max-w-none px-10 md:px-20'>
            <h1 className='text-center mb-2 mx-6 '>Let's start crafting your next priceless memory</h1>
            <Link href={"/works"} className='no-underline'>
              <button className="btn btn-primary flex mx-auto mt-6 ">Get a business quote</button>
            </Link>
          </div>
        </AnimationFadeOnShow>
      </div>


    </>
  )
}
