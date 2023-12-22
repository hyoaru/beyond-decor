import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useUpdateTeamMember() {
  const COLLECTION_NAME = 'team_members'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateTeamMember({ recordId, name, role, imageFile }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('role', role)

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

  return { updateTeamMember, isLoading }
}