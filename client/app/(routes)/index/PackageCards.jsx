"use client";
import React, { useEffect, useState } from 'react'

// App imports
import defaultPackageCards from "@/public/package_cards.json"
import PackageCard from '../../_components/index/PackageCard';
import PackageCardUpdateModal from '../../_components/index/PackageCardUpdateModal';
import PackageCardAddModal from '../../_components/shared/PackageCardAddModal';
import useGetResources from '../../_hooks/index/useGetResources';
import PackageCardDeleteModal from '../../_components/shared/PackageCardDeleteModal';

export default function PackageCards(props) {
  const { isAdmin } = props
  const [_, setState] = useState()
  const { fetchResources: fetchPackageCards, resources: packageCards, isLoading, error } = useGetResources(
    { collectionName: 'packages', defaultValue: [] }
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
          return (
            <PackageCard
              key={`PackageCard-${index}`}
              imgSrc={card.image_path}
              title={card.title}
              description={card.short_description}
              isAdmin={isAdmin}
              editModalIdToTrigger={`PackageCardEditModal-${card.id}`}
              deleteModalIdToTrigger={`PackageCardDeleteModal-${card.id}`}
              recordId={card.id}
              setState={setState}
            />
          );
        })}
      </div>

      {(isAdmin && packageCards) && packageCards.map((card, index) => (
        <div key={`PackageCardModifyModals-${index}`}>
          <PackageCardUpdateModal
            packageCard={card}
            modalId={`PackageCardEditModal-${card.id}`}
            setState={setState}
          />

          <PackageCardDeleteModal
            packageCard={card}
            modalId={`PackageCardDeleteModal-${card.id}`}
            setState={setState}
          />
        </div>
      ))}

      {isAdmin && <PackageCardAddModal nextIndex={packageCards.length} setState={setState} />}

    </>
  )
}
