"use client";

import React, { useEffect, useState, useRef } from "react";

// App imports
import LandingCard from "../components/LandingCard";
import { useAuthStateContext } from "../context";
import LandingCardModal from "../components/LandingCardModal";
import { useLandingCards } from "../hooks/landing";

export default function LandingCards() {
  const { getLandingCards, isLoading, error } = useLandingCards();
  const [landingCards, setLandingCards] = useState()
  const authState = useAuthStateContext();

  async function fetchLandingCards() {
    setLandingCards(await getLandingCards())
  }

  useEffect(() => { 
    fetchLandingCards()
  }, []);

  
  return (
    <>
      <div className="justify-center justify-items-center gap-4 grid-cols-2 hidden md:grid md:grid-cols-3 xl:flex xl:flex-nowrap">
        {landingCards &&
          landingCards.map((card) => {
            return (
              <LandingCard
                key={`LandingCard-${card.id}`}
                src={card.image_path}
                quotation={card.quotation}
                modalID={`LandingCardModal-${card.id}`}
              />
            );
          })}
      </div>

      <div className="carousel carousel-center w-full p-4 space-x-4 bg-base-100 rounded-box md:hidden">
        {landingCards &&
          landingCards.map((card) => {
            return (
              <div
                key={`LandingCardCarouselItem-${card.id}`}
                className="carousel-item"
              >
                <LandingCard
                  src={card.image_path}
                  quotation={card.quotation}
                  modalID={`LandingCardModal-${card.id}`}
                />
              </div>
            );
          })}
      </div>

      {authState.isAdmin &&
        landingCards &&
        landingCards.map((card) => {
          return (
            <LandingCardModal
              isLocal={card.isLocal}
              id={card.id}
              position={card.position}
              key={`LandingCardModal-${card.id}`}
              cardId={card.id}
              imagePath={card.image_path}
              src={card.image_path}
              modalID={`LandingCardModal-${card.id}`}
            />
          );
        })}
    </>
  );
}
