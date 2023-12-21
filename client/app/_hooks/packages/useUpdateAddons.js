import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"

export default function useUpdateAddons() {
  const COLLECTION_NAME = 'addons'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateAddons({recordId, title, category, price}) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      
      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .update(recordId, formData)

    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { updateAddons, isLoading }
}