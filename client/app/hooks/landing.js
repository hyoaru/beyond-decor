import PocketBase from "pocketbase";
import { useRef, useState } from "react";

// App imports
import defaultLandingCards from "@/public/landing_cards.json"

const pocketbase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

export function useLandingCards() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function getLandingCards() {
    setIsLoading(true)
    var landingCards = []
    try {
      const fetchedLandingCards = await pocketbase
        .collection('landing_cards')
        .getFullList({ sort: 'position', });

      if (fetchedLandingCards) {
        fetchedLandingCards.forEach((landingCard) => {
          const collectionName = "landing_cards"
          const recordId = landingCard.id
          const filename = landingCard.image_file
          const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
          const imagePath = `${baseUrl}/${collectionName}/${recordId}/${filename}`
          landingCards[landingCard.position] = landingCard
          landingCards[landingCard.position].image_path = imagePath
          landingCards[landingCard.position].isLocal = false
        })
      }
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)

    return landingCards
  }

  return { getLandingCards, isLoading, error }
}


export function usePackageCards() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function getPackageCards() {
    setIsLoading(true)
    var packageCards = []
    try {
      const fetchedPackageCards = await pocketbase
        .collection('package_cards')
        .getFullList({ sort: 'position', });

      if (fetchedPackageCards) {
        fetchedPackageCards.forEach((packageCard) => {
          const collectionName = "package_cards"
          const recordId = packageCard.id
          const filename = packageCard.image_file
          const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
          const imagePath = `${baseUrl}/${collectionName}/${recordId}/${filename}`
          packageCards[packageCard.position] = packageCard
          packageCards[packageCard.position].image_path = imagePath
          packageCards[packageCard.position].isLocal = false
        })
      }
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)

    return packageCards
  }

  return { getPackageCards, isLoading, error }
}

export function useEventsServingGroups() {
  const [isLoading, setIsLoading] = useState()
  const [error, setError] = useState()

  async function getEventsServingGroups() {
    setIsLoading(true)
    var eventsServingGroups = []
    try {
      const fetchedEventsServingGroups = await pocketbase
        .collection('events_serving')
        .getFullList({ sort: 'position', });

      if (fetchedEventsServingGroups) {
        fetchedEventsServingGroups.forEach((eventsServingGroup) => {
          const collectionName = "events_serving"
          const recordId = eventsServingGroup.id
          const filename = eventsServingGroup.image_file
          const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
          const imagePath = `${baseUrl}/${collectionName}/${recordId}/${filename}`
          eventsServingGroups[eventsServingGroup.position] = eventsServingGroup
          eventsServingGroups[eventsServingGroup.position].image_path = imagePath
          eventsServingGroups[eventsServingGroup.position].isLocal = false
        })
      }
    } catch (error) {
      setError(error)
    }
    setIsLoading(true)
    return eventsServingGroups
  }

  return { getEventsServingGroups, isLoading, error }
}