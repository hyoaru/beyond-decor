"use client";
import React, { useEffect, useState } from 'react'

// App imports
import defaultPackageCards from "@/public/package_cards.json"
import PackageCard from '../components/index/PackageCard';
import PackageCardUpdateModal from '../components/index/PackageCardUpdateModal';
import PackageCardAddModal from '../components/index/PackageCardAddModal';
import useGetResources from '../hooks/index/useGetResources';

export default function PackageCards(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchResources: fetchPackageCards, resources: packageCards, isLoading, error } = useGetResources(
    { collectionName: 'package_cards', defaultValue: defaultPackageCards }
  )

  useEffect(() => {
    async function fetchResources() {
      await fetchPackageCards()
    }

    fetchResources()
  }, [_])

  console.log(packageCards)

  return (
    <>
      <div className="px-6 flex flex-wrap gap-6 gap-y-10 justify-center">
        {packageCards && packageCards.map((card, index) => {
          const modalIdToTrigger = `PackageCardModal-${card.id}`
          const recordId = card.id
          return (
            <PackageCard
              key={`PackageCard-${index}`}
              imgSrc={card.image_path}
              title={card.title}
              description={card.description}
              isAdmin={isAdmin}
              modalIdToTrigger={modalIdToTrigger}
              recordId={recordId}
              setState={setState}
            />
          );
        })}
      </div>

      {(isAdmin && packageCards) && packageCards.map((card, index) => (
        <PackageCardUpdateModal
          key={`PackageCardModalKey-${card.id}`}
          cardImgSrc={card.image_path}
          cardPosition={card.position}
          cardId={card.id}
          modalId={`PackageCardModal-${card.id}`}
          setState={setState}
        />
      ))}

      {isAdmin && <PackageCardAddModal nextIndex={packageCards.length} setState={setState} />}

    </>
  )
}
