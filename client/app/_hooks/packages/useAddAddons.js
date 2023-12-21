import { useState } from "react"

// App imports
import getClient from "@services/pocketbase/getClient"

export default function useAddAddons() {
  const COLLECTION_NAME = 'addons'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addAddons({title, category, price}) {
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('category', category)
      formData.append('price', price)
      
      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .create(formData)

    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { addAddons, isLoading }
}