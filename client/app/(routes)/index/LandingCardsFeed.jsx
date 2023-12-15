import LandingCard from '@components/index/LandingCard';

export default function LandingCardsFeed(props) {
  const { landingCards } = props
  return (
    <>
      <div className="justify-center justify-items-center gap-4 hidden xl:flex xl:flex-nowrap">
        {landingCards && landingCards.map((card, index) => (
          <LandingCard
            key={`LandingCard-${index}`}
            imgSrc={card.image_path}
            quotation={card.quotation}
          />
        ))}
      </div>

      <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box xl:hidden">
        {landingCards && landingCards.map((card, index) => (
          <div key={`LandingCardCarouselItem-${index}`} className="carousel-item" >
            <LandingCard
              imgSrc={card.image_path}
              quotation={card.quotation}
            />
          </div>
        ))}
      </div>
    </>
  )
}
