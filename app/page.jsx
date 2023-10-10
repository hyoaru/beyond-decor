import Link from 'next/link'
import Image from 'next/image'

// App imports
import LandingCards from './index/LandingCards'
import PackageCards from './index/PackageCards'
import ParallaxSection from './index/ParallaxSection';
import EventsServingSection from './index/EventsServingSection';
import HeroSection from './index/HeroSection';
import PackagesSection from './index/PackagesSection';

export default function Home() {
  return (
    <>
      <div className="mx-6 mt-8">
        <LandingCards />
      </div>

      <div className="mt-10 lg:mt-32">
        <HeroSection />
      </div>

      <div className="mt-20 lg:mt-32">
        <ParallaxSection />
      </div>

      <div className="mt-10 lg:mt-32">
        <PackagesSection />
      </div>

      <div className="mt-32 lg:mt-48">
        <EventsServingSection />
      </div>

      <div className="my-40 lg:my-48">
        <div className='prose max-w-none px-10 md:px-20'>
          <h1 className='text-center mb-2 mx-6 '>Let's start crafting your next priceless memory</h1>
          <Link href={"/works"} className='no-underline'>
            <button className="btn btn-primary flex mx-auto mt-6 ">Get a business quote</button>
          </Link>
        </div>
      </div>


    </>
  )
}
