import { useState } from 'react'
import PocketBase from "pocketbase"

// App imports
import processResources from '@/app/libraries/index/processResources'

export default function useGetResources({ collectionName, defaultValue }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [resources, setResources] = useState([])

  async function fetchResources() {
    setIsLoading(true)

    try {
      const fetchedResources = await pocketbase
        .collection(collectionName)
        .getFullList({ sort: 'position', });

      setResources(
        processResources({
          collectionName: collectionName,
          resources: fetchedResources
        })
      )
      
    } catch (error) {
      setResources(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchResources, resources, isLoading, error }
}
