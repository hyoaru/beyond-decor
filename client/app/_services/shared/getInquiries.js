"use server"

import getClient from "@services/pocketbase/getClient";

export default async function getInquiries({ sortBy = "created" } = {}) {
  const COLLECTION_NAME = 'inquiries'
  const pocketbase = getClient()
  const response = { data: null, error: null }

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({ 
        sort: sortBy, 
        expand: "main_package, addons"
      })

  } catch (error) {
    response.error = error
  }

  return response
}
