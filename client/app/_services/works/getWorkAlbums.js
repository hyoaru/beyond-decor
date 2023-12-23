"use server"

import getImagePublicUrl from "@libraries/shared/getImagePublicUrl";
import getClient from "@services/pocketbase/getClient";

export default async function getWorkAlbums() {
  const COLLECTION_NAME = 'work_albums'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ 
        sort: 'event_date',
        expand: "package_type" 
      })
      .then(async (workAlbums) => {
        workAlbums.map((workAlbum) => {
          workAlbum.thumbnail_path = getImagePublicUrl({
            collectionName: COLLECTION_NAME,
            recordId: workAlbum.id,
            fileName: workAlbum.thumbnail_file
          })
        })

        return workAlbums
      })

  } catch (error) {
    response.error = error
  }

  return response
}
