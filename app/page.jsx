import Image from 'next/image'
import LandingCard from './components/LandingCard'

export default function Home() {
  return (
    <>
      <div className="mx-6">
        <div className='justify-center justify-items-center gap-4 grid-cols-2 hidden md:grid md:grid-cols-3 xl:flex xl:flex-nowrap'>
          <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          <LandingCard src="https://picsum.photos/200/500" quotation="What the fuck" />
          <LandingCard src="https://picsum.photos/200/500" quotation="Am i doing" />
          <LandingCard src="https://picsum.photos/200/500" quotation="Sir penge uno" />
          <LandingCard src="https://picsum.photos/200/500" quotation="Or else " />
          <LandingCard src="https://picsum.photos/200/500" quotation="Betlog" />
        </div>
        <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box md:hidden">
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
          <div className="carousel-item">
            <LandingCard src="https://picsum.photos/200/500" quotation="Crafted with Creativity" />
          </div>
        </div>
      </div>

      <div className='my-8 bg-base-200 prose max-w-none py-10 md:px-20'>
        <h2 className='text-center mb-4'>Turning events into priceless memories</h2>
        <p className='text-center px-8 xl:px-36'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos iste placeat quidem, maiores magnam enim quo. Voluptas molestiae qui nemo minus quibusdam cupiditate, animi quos fugiat provident nihil voluptatum laboriosam. Perferendis fuga molestiae ipsam! Tenetur quaerat, earum repellat distinctio tempore cumque illum iste magni harum accusamus.</p>
      </div>

      <div style={{ height: "20rem" }}>

      </div>
    </>
  )
}
