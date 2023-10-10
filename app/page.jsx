import Link from 'next/link'
import Image from 'next/image'

// App imports
import LandingCards from './index/LandingCards'
import PackageCards from './index/PackageCards'
import ParallaxSection from './index/ParallaxSection';
import EventsServingSection from './index/EventsServingSection';
import HeroSection from './index/HeroSection';
import PackagesSection from './index/PackagesSection';
import CallToActionSection from './index/CallToActionSection';

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
        <CallToActionSection />
      </div>


    </>
  )
}
