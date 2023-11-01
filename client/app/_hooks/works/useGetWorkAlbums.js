import { useState } from 'react'
import PocketBase from "pocketbase"

// App imports
import processWorkAlbums from '@/app/_libraries/works/processWorkAlbums'

export default function useGetWorkAlbums({ collectionName = "work_albums", defaultValue }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [workAlbums, setWorkAlbums] = useState([])

  async function fetchWorkAlbums() {
    setIsLoading(true)

    try {
      const fetchedWorkAlbums = await pocketbase
        .collection(collectionName)
        .getFullList({ sort: 'event_date', });

      setWorkAlbums(
        processWorkAlbums({
          collectionName: collectionName,
          albums: fetchedWorkAlbums
        })
      )

    } catch (error) {
      setWorkAlbums(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchWorkAlbums, workAlbums, isLoading, error }
}
