import { useState } from "react";
import PocketBase from "pocketbase"

export function useCollectionRecordDelete({ collectionName }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordDelete({ recordId }) {
    setIsLoading(true)
    try {
      await pocketbase.collection(`${collectionName}`).delete(recordId);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { collectionRecordDelete, isLoading, error }
}