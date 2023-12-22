import { useState } from "react"
import dayjs from "dayjs"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useAddInquiry() {
  const COLLECTION_NAME = 'inquiries'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function addInquiry(props) {
    const { fullName, phoneNumber, emailAddress, facebookLink, eventType, eventPlace, itemsTotalCost } = props
    const { eventDate, acquisitionSurvey, preferredDesignDescription, preferredDesignSamples, mainPackage, addOns } = props
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('full_name', fullName)
      formData.append('phone_number', phoneNumber)
      formData.append('email_address', emailAddress)
      formData.append('facebook_link', facebookLink)
      formData.append('event_type', eventType)
      formData.append('event_place', eventPlace)
      formData.append('event_date', dayjs(eventDate))
      formData.append('acquisition_survey', acquisitionSurvey)
      formData.append('preferred_design_description', preferredDesignDescription)
      formData.append('items_total_cost', itemsTotalCost)
      formData.append('main_package', mainPackage.id)

      addOns.forEach((addOn) => {
        formData.append('addons', addOn?.id)
      })

      if (preferredDesignSamples?.[0]) {
        for await (const imageFile of preferredDesignSamples) {
          const resizedImage = await resizeImage(imageFile)
          formData.append('preferred_design_samples', resizedImage)
        }
      }

      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .create(formData, {
          expand: 'main_package, addons'
        })

    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { addInquiry, isLoading }
}