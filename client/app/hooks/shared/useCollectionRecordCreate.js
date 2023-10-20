import { useState } from "react";
import PocketBase from "pocketbase"

export function useCollectionRecordCreate({ collectionName }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordCreate({ formData }) {
    setIsLoading(true)
    try {
      await pocketbase.collection(collectionName).create(formData);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { collectionRecordCreate, isLoading, error }
}