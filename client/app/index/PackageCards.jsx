"use client";
import React, { useEffect, useState } from 'react'

// App imports
import { useSupabaseContext, useUserStateContext } from '../context';
import PackageCard from '../components/PackageCard';
import PackageCardModal from '../components/PackageCardModal';

export default function PackageCards() {
  const supabase = useSupabaseContext()
  const user = useUserStateContext()
  const [packageCards, setPackageCards] = useState()

  useEffect(() => {
    async function fetchPackageCards() {
      try {
        const { data, error } = await supabase
          .from('package_cards')
          .select()
          .order('id', { ascending: true })

        if (data) {
          setPackageCards(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPackageCards()
  }, [])

  return (
    <>
      <div className="px-6 flex flex-wrap gap-6 gap-y-10 justify-center">
        {packageCards && packageCards.map((card, index) => {
          const id = card.id
          const title = card.title
          const description = card.description
          const imagePath = card.image_path
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(imagePath)
          const imageUrl = data.publicUrl

          return (
            <div key={`PackageCard-${index}`}>
              <PackageCard cardId={id} src={imageUrl} title={title} description={description} modalId={`PackageCardModal-${id}`} />
              {user && <PackageCardModal src={imageUrl} imagePath={imagePath} cardId={id} modalId={`PackageCardModal-${id}`} />}
            </div>
          )
        })}
      </div>

    </>
  )
}
