"use server"

import getImagePublicUrl from "@libraries/shared/getImagePublicUrl";
import getClient from "@services/pocketbase/getClient";

export default async function getWorkAlbum({ recordId }) {
  const COLLECTION_NAME = 'work_albums'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getOne(recordId, { expand: "package_type" })
      .then(async (workAlbum) => {
        const thumbnail_path = getImagePublicUrl({
          collectionName: COLLECTION_NAME,
          recordId: recordId,
          fileName: workAlbum.thumbnail_file
        })

        const image_paths = workAlbum.image_files.map((imageFileName) => getImagePublicUrl({
          collectionName: COLLECTION_NAME,
          recordId: recordId,
          fileName: imageFileName
        }))

        workAlbum.thumbnail_path = thumbnail_path
        workAlbum.image_paths = image_paths
        return workAlbum
      })

  } catch (error) {
    response.error = error
  }

  return response
}
