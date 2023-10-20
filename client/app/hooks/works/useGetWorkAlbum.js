import { useState } from 'react'
import PocketBase from "pocketbase"

// App imports
import processWorkAlbums from '@/app/libraries/works/processWorkAlbums'

export default function useGetWorkAlbum({ collectionName = "work_albums", recordId }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [workAlbum, setWorkAlbum] = useState([])

  async function fetchWorkAlbum() {
    setIsLoading(true)

    try {
      const fetchedWorkAlbum = await pocketbase
        .collection(collectionName)
        .getFirstListItem(`id="${recordId}"`);

      setWorkAlbum(
        processWorkAlbums({
          collectionName: collectionName,
          albums: [fetchedWorkAlbum]
        })[0]
      )

    } catch (error) {
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchWorkAlbum, workAlbum, isLoading, error }
}
