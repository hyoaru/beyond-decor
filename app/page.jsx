import Image from 'next/image'
import LandingCard from './components/LandingCard'

export default function Home() {
  return (
    <>
      <div className='justify-center justify-items-center gap-4 grid-cols-2 hidden md:grid md:grid-cols-3 xl:flex xl:flex-nowrap'>
        <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        <LandingCard src="https://picsum.photos/200/500" quotation="What the fuck"/>
        <LandingCard src="https://picsum.photos/200/500" quotation="Am i doing"/>
        <LandingCard src="https://picsum.photos/200/500" quotation="Sir penge uno"/>
        <LandingCard src="https://picsum.photos/200/500" quotation="Or else "/>
        <LandingCard src="https://picsum.photos/200/500" quotation="Betlog"/>
      </div>

      <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box md:hidden">
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
        <div className="carousel-item">
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity"/>
        </div>
      </div>
    </>
  )
}
