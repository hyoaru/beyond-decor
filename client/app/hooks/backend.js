import PocketBase from "pocketbase";
import { useState } from "react";

const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

export function useCollectionRecordUpdate() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordUpdate({ collectionName, recordId, formData }) {
    setIsLoading(true)
    try {
      await pocketbase.collection(`${collectionName}`).update(recordId, formData);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { collectionRecordUpdate, isLoading, error }
}

export function useCollectionRecordCreate() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordCreate({ collectionName, formData }) {
    setIsLoading(true)
    try {
      await pocketbase.collection(`${collectionName}`).create(formData);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return { collectionRecordCreate, isLoading, error }
}

export function useCollectionRecordDelete() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function collectionRecordDelete({ collectionName, recordId }){
    setIsLoading(true)
    try {
      await pocketbase.collection(`${collectionName}`).delete(recordId);
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  return {collectionRecordDelete, isLoading, error}
}