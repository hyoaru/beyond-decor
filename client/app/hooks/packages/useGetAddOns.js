import { useState } from 'react'
import PocketBase from "pocketbase"

export default function useGetAddOns({ collectionName="addons", category, defaultValue=[] }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [addOns, setAddOns] = useState([])

  async function fetchAddOns() {
    setIsLoading(true)

    try {
      const fetchedAddOns = await pocketbase
        .collection(collectionName)
        .getFullList(`category="${category}"`, { sort: 'created', });

      setAddOns(fetchedAddOns)
    } catch (error) {
      setAddOns(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchAddOns, addOns, isLoading, error }
}