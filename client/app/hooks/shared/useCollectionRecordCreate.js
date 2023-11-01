import { useState } from "react";
import PocketBase from "pocketbase"

export function useCollectionRecordCreate({ collectionName }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordCreate({ formData }) {
    let operationResponse = {status: 500, message: "error"}
    setIsLoading(true)
    try {
      operationResponse = await pocketbase.collection(collectionName).create(formData);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
    return operationResponse
  }

  return { collectionRecordCreate, isLoading, error }
}