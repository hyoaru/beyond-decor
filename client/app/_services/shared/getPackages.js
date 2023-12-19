"use server"

import getClient from "@services/pocketbase/getClient";

export default async function getPackages() {
  const COLLECTION_NAME = 'packages'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ sort: 'price' })
  } catch (error) {
    response.error = error
  }

  return response
}
