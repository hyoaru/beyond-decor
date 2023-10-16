"use client";
import React, { useEffect, useState } from 'react'

// App imports
import { usePocketbaseContext, useAuthStateContext } from '../context';
import PackageCard from '../components/PackageCard';
import PackageCardModal from '../components/PackageCardModal';
import { usePackageCards } from '../hooks/landing';

export default function PackageCards(props) {
  const authState = useAuthStateContext()
  const packageCards = props.packageCards

  return (
    <>
      <div className="px-6 flex flex-wrap gap-6 gap-y-10 justify-center">
        {packageCards && packageCards.map((card, index) => {
          return (
            <div key={`PackageCard-${index}`}>
              <PackageCard
                cardId={card.id}
                src={card.image_path}
                title={card.title}
                description={card.description}
                modalId={`PackageCardModal-${card.id}`}
              />
              {authState.isAdmin && <>
                <PackageCardModal
                  src={card.image_path}
                  imagePath={card.image_path}
                  cardId={card.id}
                  modalId={`PackageCardModal-${card.id}`}
                  position={card.position}
                />
              </>}
            </div>
          )
        })}
      </div>

    </>
  )
}
