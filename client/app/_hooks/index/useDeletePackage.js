import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useDeletePackage() {
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function deletePackage({ recordId }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      response.data = await pocketbase
        .collection('packages')
        .delete(recordId)
        
    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { deletePackage, isLoading }
}