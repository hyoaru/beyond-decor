import dayjs from 'dayjs'

// App imports
import { pocketbase } from '@/app/context/Pocketbase'

export default async function isEventDateConflicting({ eventDate, inquiries }) {
  const collectionName = 'inquiries'
  const formattedEventDate = dayjs(eventDate).format('YYYY-MM-DD')
  let eventDateInConflictCount = 0

  if (!inquiries) {
    const fetchedInquiries = await pocketbase
      .collection(collectionName)
      .getFullList()
      .then((response) => { inquiries = response })
      .catch((error) => { console.log(error) })
  }

  if (inquiries.length <= 0) { return eventDateInConflictCount }

  const filteredInquiries = inquiries.filter((inquiry) => (
    formattedEventDate === dayjs(inquiry.event_date).format('YYYY-MM-DD')
  ))

  eventDateInConflictCount = filteredInquiries.length
  return eventDateInConflictCount
}
