"use server"

import getClient from "@services/pocketbase/getClient";
import dayjs from "dayjs";

export default async function getInquiriesByDateRange({ startDate, endDate }) {
  const COLLECTION_NAME = 'inquiries'
  const pocketbase = getClient()
  const response = { data: null, error: null }
  const startDateFormatted = dayjs(startDate).format('YYYY-MM-DD')
  const endDateFormatted = dayjs(endDate).add(1, 'day').format('YYYY-MM-DD')

  try {
    response.data = await pocketbase
      .collection(COLLECTION_NAME)
      .getFullList({
        sort: 'created',
        expand: "main_package, addons",
        filter: `created >= '${startDateFormatted}' && created <= '${endDateFormatted}'`
      })

  } catch (error) {
    response.error = Object.fromEntries(Object.entries(error))
  }

  return response
}
