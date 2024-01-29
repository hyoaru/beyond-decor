"use server"

import getClient from "@services/pocketbase/getClient";
import getImagePublicUrl from "@libraries/shared/getImagePublicUrl";

export default async function getAllPackages() {
  const COLLECTION_NAME = 'packages'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ sort: 'price' })
      .then((packages) => {
        packages?.map((_package) => {
          _package.image_path = getImagePublicUrl({
            collectionName: COLLECTION_NAME,
            recordId: _package.id,
            fileName: _package.image_file
          })
        })

        return packages
      })
  } catch (error) {
    response.error = error
  }

  return response
}
