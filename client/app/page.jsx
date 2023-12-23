import Link from 'next/link';

// App imports
import PackageCardsFeed from '@/app/(routes)/index/PackageCardsFeed'
import EventServingGroupsFeed from '@/app/(routes)/index/EventServingGroupsFeed';
import AnimationFadeOnShow from '@animations/shared/AnimationFadeOnShow';
import LandingCardsFeed from '@/app/(routes)/index/LandingCardsFeed';
import getAuthState from '@services/authentication/getAuthState';
import TriggerModalButton from '@components/shared/TriggerModalButton';
import getPackageCards from '@services/index/getPackageCards';
import getEventServingGroups from '@services/index/getEventServingGroups';
import getLandingCards from '@services/index/getLandingCards';

export default async function Home() {
  const authState = await getAuthState()
  const landingCards = await getLandingCards()
  const packages = await getPackageCards()
  const eventServingGroups = await getEventServingGroups()

  return (
    <>
      <div className="px-4 mx-auto md:mt-8 xl:container">
        <LandingCardsFeed landingCards={landingCards} />
      </div>


      {/* Hero section */}
      <div className="mt-10 lg:mt-32">
        <div className='prose max-w-none mx-auto md:px-16 md:container'>
          <h1 className='text-center mx-6 mb-4 leading-relaxed'>
            {'Turning events into '}
            <AnimationFadeOnShow initialOpacity={0.3}>
              <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>priceless memories</span>
            </AnimationFadeOnShow>
          </h1>
          <p className='text-center px-8 xl:px-36'>
            Picture a realm where every aspect, every flavor, and every instant is intricately fashioned
            to transform your occasion into an enduring treasure. This is the essence of Beyond Decor.
            With an unwavering dedication to perfection and an enduring commitment to excellence,
            we stand by your side in the art of crafting unforgettable moments.
          </p>
          <Link href="/works" className='no-underline'>
            <button className="btn btn-outline mt-8 flex mx-auto rounded-xl rounded-tr-none rounded-bl-none">See for yourself</button>
          </Link>
        </div>
      </div>


      {/* Parallax section */}
      <div className="mt-20 lg:mt-32">
        <div className='h-[25rem] md:h-[30rem] bg-fixed bg-bottom bg-cover shadow-xl' style={{backgroundImage: 'url(/ParallaxImage.jpg)'}}>
          <div className='flex justify-center items-center h-full md:hidden'>
            <h1 className="text-white font-black text-4xl p-5 border rounded-box">Beyond Decor</h1>
          </div>
        </div>
      </div>


      {/* Packages section */}
      <div className="mt-10 lg:mt-32">
        <div className="prose max-w-none py-10 md:px-20">
          <h1 className="text-center mx-6 mb-4 leading-relaxed">
            {'A glimpse of our '}
            <AnimationFadeOnShow initialOpacity={0.3}>
              <span className='p-1 bg-primary text-white rounded-xl rounded-tr-none rounded-bl-none'>selection</span>
            </AnimationFadeOnShow>
          </h1>
          <p className='text-center px-8 xl:px-36'>
            We invite you to dream big and let our creativity take your event to new heights.
            With us, your event is not just an occasion; it&apos;s a canvas on which we paint unforgettable memories with the brush of creativity.
            Welcome to a world where imagination knows no bounds, where every event is a masterpiece waiting to be unveiled.
          </p>
        </div>

        {authState.isAdmin && <>
          <div className="flex">
            <TriggerModalButton
              className={'mx-auto mb-10'}
              modalIdToTrigger={'AddPackageCardModal'}
            >
              {'[ add package ]'}
            </TriggerModalButton>
          </div>
        </>}

        <PackageCardsFeed packages={packages} isAdmin={authState.isAdmin} />

        <Link href="/works" className='no-underline'>
          <button className="btn flex mx-auto mt-16 btn-outline">View Packages</button>
        </Link>
      </div>


      {/* Events serving section */}
      <div className="mt-32 lg:mt-48">
        <EventServingGroupsFeed
          eventServingGroups={eventServingGroups}
          isAdmin={authState.isAdmin}
        />
      </div>


      {/* Call to action section */}
      <div className="my-40 lg:my-48">
        <AnimationFadeOnShow initialOpacity={0.3}>
          <div className='prose max-w-none px-10 md:px-20'>
            <h1 className='text-center mb-2 mx-6 '>{"Let's start crafting your next priceless memory"}</h1>
            <Link href={"/works"} className='no-underline'>
              <button className="btn btn-primary flex mx-auto mt-6 ">Get a business quote</button>
            </Link>
          </div>
        </AnimationFadeOnShow>
      </div>

    </>
  )
}
