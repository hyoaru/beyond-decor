import { useState } from "react"
import dayjs from "dayjs"

// App imports
import getClient from "@services/pocketbase/getClient"
import { resizeImage } from "@libraries/shared/resizeImage"

export default function useUpdateWorkAlbum() {
  const COLLECTION_NAME = 'work_albums'
  const pocketbase = getClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateWorkAlbum(props) {
    const { recordId, eventName, eventDate, eventPlace, packageType, clientName, thumbnailFile, imageFiles } = props
    const response = { data: null, error: null }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('event_name', eventName)
      formData.append('event_date', dayjs(eventDate))
      formData.append('event_place', eventPlace)
      formData.append('package_type', packageType)
      formData.append('client_name', clientName)

      if (thumbnailFile?.[0]) {
        const resizedImage = await resizeImage(thumbnailFile[0])
        formData.append('thumbnail_file', resizedImage)
      }

      if (imageFiles?.[0]) {
        for await (const imageFile of imageFiles) {
          const resizedImage = await resizeImage(imageFile)
          formData.append('image_files', resizedImage)
        }
      }

      response.data = await pocketbase
        .collection(COLLECTION_NAME)
        .update(recordId, formData)

    } catch (error) {
      response.error = error
    }
    setIsLoading(false)

    return response
  }

  return { updateWorkAlbum, isLoading }
}