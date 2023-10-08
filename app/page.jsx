import Link from 'next/link'
import Image from 'next/image'

// App imports
import LandingCards from './index/LandingCards'
import PackageCards from './index/PackageCards'

export default function Home() {
  return (
    <>
      <div className="mx-6 mt-8">
        <LandingCards />
      </div>

      <div className='mt-28 bg-base-200 prose max-w-none py-10 md:px-20'>
        <h2 className='text-center mx-6 mb-4'>Turning events into priceless memories</h2>
        <p className='text-center px-8 xl:px-36'>Picture a realm where every aspect, every flavor, and every instant is intricately fashioned to transform your occasion into an enduring treasure. This is the essence of Beyond Decor. With an unwavering dedication to perfection and an enduring commitment to excellence, we stand by your side in the art of crafting unforgettable moments.</p>
        <Link href="/works" className='no-underline'>
          <button className="btn btn-outline mt-8 flex mx-auto">See for yourself</button>
        </Link>
      </div>

      <div className="mt-28 prose max-w-none md:px-20">
        <div className="mb-10">
          <h2 className="text-center mb-4 mx-6">Creative brilliances we offer</h2>
          <p className='px-8 xl:px-36 text-center'>We invite you to dream big and let our creativity take your event to new heights. With us, your event is not just an occasion; it's a canvas on which we paint unforgettable memories with the brush of creativity. Welcome to a world where imagination knows no bounds, where every event is a masterpiece waiting to be unveiled.</p>
        </div>
        <PackageCards />
        <Link href="/works" className='no-underline'>
          <button className="btn flex mx-auto mt-16 btn-outline">View Packages</button>
        </Link>
      </div>

      <div className="mt-32 bg-base-200 prose max-w-none py-10 md:px-20">
        <h2 className='text-center mb-4 mx-6'>Served over 50 satisfied clients from Calabarzon</h2>
        <p className='px-8 xl:px-36 text-center'>At Beyond Decor, our commitment goes beyond just creating stunning events. We are dedicated to empowering our clients to be active participants in shaping their dream occasions. With Beyond Decor by your side, you become the architect of your event, and we provide the tools, creativity, and expertise to turn your ideas into extraordinary realities.</p>
      </div>


      <div className='my-28 prose max-w-none md:px-20'>
        <h2 className='text-center mb-2 mx-6 '>Let's start crafting your next priceless memory</h2>
        <Link href={"/works"} className='no-underline'>
          <button className="btn btn-outline flex mx-auto mt-6 ">Get a business quote</button>
        </Link>
      </div>

      
    </>
  )
}
