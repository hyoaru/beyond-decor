"use client";

import React, { useEffect, useState } from 'react'

// App imports
import LandingCard from '../components/LandingCard'
import { useSupabaseContext, useUserStateContext } from '../context';
import LandingCardModal from '../components/LandingCardModal';

export default function LandingCards() {
  const [landingCards, setLandingCards] = useState()
  const supabase = useSupabaseContext()
  const user = useUserStateContext()

  useEffect(() => {
    async function fetchLandingCards() {
      try {
        const { data, error } = await supabase
          .from('landing_cards')
          .select()
          .order('id', { ascending: true })

        if (data) {
          setLandingCards(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchLandingCards()
  }, [])

  return (
    <>
      <div className='justify-center justify-items-center gap-4 grid-cols-2 hidden md:grid md:grid-cols-3 xl:flex xl:flex-nowrap'>
        {landingCards && landingCards.map((card) => {
          const id = card.id
          const quotation = card.quotation
          const imagePath = card.image_path
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(imagePath)
          const imageUrl = data.publicUrl

          return (
            <LandingCard
              key={`LandingCard-${id}`}
              src={imageUrl}
              quotation={quotation}
              modalID={`LandingCardModal-${id}`}
            />
          )
        })}
      </div>

      <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box md:hidden">
        {landingCards && landingCards.map((card) => {
          const id = card.id
          const imagePath = card.image_path
          const quotation = card.quotation
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(imagePath)
          const imageUrl = data.publicUrl

          return (
            <div key={`LandingCardCarouselItem-${id}`} className="carousel-item">
              <LandingCard src={imageUrl} quotation={quotation} modalID={`LandingCardModal-${id}`} />
            </div>
          )
        })}
      </div>

      {(user && landingCards) && landingCards.map((card) => {
        const id = card.id
        const imagePath = card.image_path
        const { data } = supabase
          .storage
          .from("medias")
          .getPublicUrl(imagePath)
        const imageUrl = data.publicUrl

        return (
          <LandingCardModal
            key={`LandingCardModal-${id}`}
            cardId={id}
            imagePath={imagePath}
            src={imageUrl}
            modalID={`LandingCardModal-${id}`}
          />
        )
      })}
    </>
  )
}
