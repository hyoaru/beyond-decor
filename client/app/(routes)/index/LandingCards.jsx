"use client";

import { useEffect, useState } from "react";

// App imports
import defaultLandingCards from "@/public/landing_cards.json"
import LandingCard from "../../_components/index/LandingCard";
import LandingCardUpdateModal from "../../_components/index/LandingCardUpdateModal";
import useGetResources from "../../_hooks/index/useGetResources";
import Loading from "@/app/loading";

export default function LandingCards(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchResources: fetchLandingCards, resources: landingCards, isLoading, error } = useGetResources(
    { collectionName: 'landing_cards', defaultValue: [] }
  )

  useEffect(() => {
    fetchLandingCards()
  }, [_])

  if (isLoading) { return <Loading /> }

  return (
    <>
      <div className="justify-center justify-items-center gap-4 grid-cols-2 hidden md:grid md:grid-cols-3 xl:flex xl:flex-nowrap">
        {landingCards && landingCards.map((card) => (
          <LandingCard
            key={`LandingCard-${card.id}`}
            imgSrc={card.image_path}
            quotation={card.quotation}
            modalIdToTrigger={`LandingCardModal-${card.id}`}
            isAdmin={isAdmin}
          />
        )
        )}
      </div>

      <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box md:hidden">
        {landingCards && landingCards.map((card) => {
          return (
            <div key={`LandingCardCarouselItem-${card.id}`} className="carousel-item" >
              <LandingCard
                imgSrc={card.image_path}
                quotation={card.quotation}
                modalIdToTrigger={`LandingCardModal-${card.id}`}
                isAdmin={isAdmin}
              />
            </div>
          ); Z
        })}
      </div>

      {(isAdmin && landingCards) && landingCards.map((card) => (
        <LandingCardUpdateModal
          key={`LandingCardModal-${card.id}`}
          landingCard={card}
          modalId={`LandingCardModal-${card.id}`}
          setState={setState}
        />
      )
      )}
    </>
  );
}
