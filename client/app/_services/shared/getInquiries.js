"use server"

import getClient from "@services/pocketbase/getClient";
import processInquiry from "@libraries/shared/processInquiry";

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
      .then((inquiries) => {
        inquiries.map((inquiry) => processInquiry(inquiry))
        return inquiries
      })

  } catch (error) {
    response.error = error
  }

  return response
}
