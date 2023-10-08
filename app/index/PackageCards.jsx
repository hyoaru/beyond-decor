"use client";
import React, { useEffect, useState } from 'react'

// App imports
import { useSupabaseContext } from '../context';
import PackageCard from '../components/PackageCard';

export default function PackageCards() {
  const supabase = useSupabaseContext()
  const [packageCards, setPackageCards] = useState()
  const packages = [
    { title: "Basic Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Themed Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Full Backdrop Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Full Venue Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
  ]

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
      <div className="flex flex-wrap gap-6 gap-y-10 justify-center">
        {packageCards && packageCards.map((card, index) => {
          const title = card.title
          const description = card.description
          const imagePath = card.image_path
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(imagePath)
          const imageUrl = `${data.publicUrl}?${performance.now()}`

          return <PackageCard key={`PackageCard-${index}`} src={imageUrl} title={title} description={description} />
        })}
      </div>

    </>
  )
}
