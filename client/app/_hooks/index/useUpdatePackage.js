import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useUpdatePackage() {
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updatePackage({ recordId, title, shortDescription, imageFile }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('short_description', shortDescription)

      if (imageFile[0]) { 
        const resizedImage = await resizeImage(imageFile[0])
        formData.append('image_file', resizedImage) 
      }

      response.data = await pocketbase
        .collection('packages')
        .update(recordId, formData)
        
    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { updatePackage, isLoading }
}