import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useAddTeamMember() {
  const COLLECTION_NAME = 'team_members'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addTeamMember({ name, role, imageFile }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('role', role)
      formData.append('image_file', await resizeImage(imageFile[0]))

      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .create(formData)
        
    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { addTeamMember, isLoading }
}