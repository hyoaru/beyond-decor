import { useState } from 'react'
import PocketBase from "pocketbase"

export default function useGetPackages({ collectionName="packages", defaultValue=[] }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [packages, setPackages] = useState([])

  async function fetchPackages() {
    setIsLoading(true)

    try {
      const fetchedPackages = await pocketbase
        .collection(collectionName)
        .getFullList({ sort: 'created', });

      setPackages(fetchedPackages)
    } catch (error) {
      setPackages(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchPackages, packages, isLoading, error }
}
