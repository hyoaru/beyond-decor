import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"

export default function useDeleteRecord() {
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function deleteRecord({ collectionName, recordId }) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      response.data = await pocketbase
        .collection(collectionName)
        .delete(recordId)
        
    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { deleteRecord, isLoading }
}