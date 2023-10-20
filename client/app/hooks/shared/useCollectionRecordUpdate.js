import { useState } from "react";
import PocketBase from 'pocketbase'

export function useCollectionRecordUpdate({ collectionName }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordUpdate({ recordId, formData }) {
    setIsLoading(true)
    try {
      if (formData) {
        await pocketbase.collection(`${collectionName}`).update(recordId, formData);
      } else {
        console.log("none")
      }
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { collectionRecordUpdate, isLoading, error }
}