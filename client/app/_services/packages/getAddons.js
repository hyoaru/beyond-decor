"use server"

import getClient from "@services/pocketbase/getClient";

export default async function getAddOns() {
  const COLLECTION_NAME = 'addons'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ sort: 'category' })

    } catch (error) {
      response.error = error
    }
    
  return response
}
