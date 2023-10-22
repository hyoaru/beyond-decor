import { useState } from 'react'
import PocketBase from "pocketbase"

// App imports
import processTeamMembers from '@/app/libraries/about/processTeamMembers'

export default function useGetTeamMembers({ collectionName, defaultValue = [] }) {
  const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()
  const [teamMembers, setTeamMembers] = useState([])

  async function fetchTeamMembers() {
    setIsLoading(true)

    try {
      const fetchedTeamMembers = await pocketbase
        .collection(collectionName)
        .getFullList({ sort: 'created', });

      setTeamMembers(
        processTeamMembers({
          collectionName: collectionName,
          teamMembers: fetchedTeamMembers
        })
      )
      
    } catch (error) {
      setTeamMembers(defaultValue)
      setError(error)
    }

    setIsLoading(false)
  }

  return { fetchTeamMembers, teamMembers, isLoading, error }
}
