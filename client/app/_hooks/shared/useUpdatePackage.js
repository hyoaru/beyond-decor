import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"
import processInclusions from "@libraries/shared/processInclusions"

export default function useUpdatePackage() {
  const COLLECTION_NAME = 'packages'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updatePackage({ recordId, title, description, shortDescription, inclusions, price, imageFile }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('short_description', shortDescription)
      formData.append('inclusions', JSON.stringify(processInclusions(inclusions)))
      formData.append('price', price)

      if (imageFile?.[0]) {
        const resizedImage = await resizeImage(imageFile[0])
        formData.append('image_file', resizedImage)
      }

      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .update(recordId, formData)
        
    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { updatePackage, isLoading }
}