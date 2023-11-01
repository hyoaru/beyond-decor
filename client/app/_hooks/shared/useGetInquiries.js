import { useState } from 'react'
import PocketBase from "pocketbase"

// App imports
import processInquiries from '@/app/_libraries/shared/processInquiries'

export default function useGetInquiries({ collectionName = 'inquiries', defaultValue }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [inquiries, setInquiries] = useState([])

  const fetchInquiries = async () => {
    setIsLoading(true)

    try {
      const fetchedInquiries = await pocketbase
        .collection(collectionName)
        .getFullList({ sort: 'created' });

      setInquiries(
        processInquiries({
          collectionName: collectionName,
          inquiries: fetchedInquiries
        })
      )
    } catch (error) {
      setInquiries(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchInquiries, inquiries, isLoading, error }
}
