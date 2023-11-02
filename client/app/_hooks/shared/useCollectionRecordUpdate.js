import { useState } from "react";
import PocketBase from 'pocketbase'

export function useCollectionRecordUpdate({ collectionName }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordUpdate({ recordId, formData }) {
    let operationResponse = { status: 500, message: "error" }
    setIsLoading(true)
    try {
      operationResponse = await pocketbase.collection(`${collectionName}`).update(recordId, formData);
    } catch (error) {
      if (error.status === 403) { window.location.reload() }
      setError(error)
    }
    setIsLoading(false)
    return operationResponse
  }

  return { collectionRecordUpdate, isLoading, error }
}