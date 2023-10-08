"use client";
import React, { useEffect, useState } from 'react'

// App imports
import { useSupabaseContext } from '../context';
import PackageCard from '../components/PackageCard';

export default function PackageCards() {
  const supabase = useSupabaseContext()
  const [packageCardImages, setPackageCardImages] = useState([{}])
  const packages = [
    { title: "Basic Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Themed Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Full Backdrop Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
    { title: "Full Venue Package", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus, asperiores." },
  ]

  useEffect(() => {
    async function fetchPackageCardImages() {
      try {
        const { data, error } = await supabase
          .storage
          .from('medias')
          .list('package-cards', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          })

        if (data) {
          setPackageCardImages(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPackageCardImages()
  }, [])

  return (
    <>
      <div className="flex flex-wrap gap-6 gap-y-10 justify-center">
        {packageCardImages.map((image, index) => {
          if (!image) { return }

          const title = packages[index].title
          const description = packages[index].description
          const imageFileName = image.name
          const { data } = supabase
            .storage
            .from("medias")
            .getPublicUrl(`package-cards/${imageFileName}`)
          const imageUrl = data.publicUrl

          return <PackageCard key={`PackageCard-${index}`} src={imageUrl} title={title} description={description} />
        })}
      </div>

    </>
  )
}
