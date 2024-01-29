import dayjs from 'dayjs'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// App imports
import WorkAlbumUpdateModal from '@components/works/WorkAlbumUpdateModal'
import getWorkAlbum from '@services/works/getWorkAlbum'
import getAuthState from '@services/authentication/getAuthState'
import WorkAlbumDropdownAction from '@components/works/WorkAlbumDropdownAction'
import RecordDeleteModal from '@components/shared/RecordDeleteModal'
import getAllPackages from '@services/shared/getAllPackages'

export default async function Page({ params }) {
  const { data: workAlbum, error } = await getWorkAlbum({ recordId: params?.id })
  const { data: packages } = await getAllPackages()
  const authState = await getAuthState()
  if (error) { return notFound() }
  
  const { id: recordId, event_name: eventName, event_place: eventPlace, event_date: eventDate } = workAlbum
  const { client_name: clientName, thumbnail_path: thumbnailPath, image_paths: imagePaths } = workAlbum
  const formattedEventDate = dayjs(eventDate).format("MMMM DD, YYYY")

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="grid gap-6 items-center md:grid-cols-2 md:gap-14 lg:gap-24 my-20">
          <div className="prose max-w-none text-center md:text-right md:justify-self-end md:prose-lg lg:w-10/12 xl:w-8/12">
            <h1 className='md:leading-normal'>
              <span className='p-1 text-white bg-primary rounded-xl rounded-tr-none rounded-bl-none'>{eventName}</span>
            </h1>
          </div>
          <div className="text-center md:justify-self-start md:text-left lg:w-10/12 xl:w-8/12">
            {authState.isAdmin && <>
              <WorkAlbumDropdownAction
                recordId={recordId}
                editModalIdToTrigger={`WorkAlbumUpdateModal-${recordId}`}
                deleteModalIdToTrigger={`WorkAlbumDeleteModal-${recordId}`}
              />
            </>}
            <p className='font-bold'>{eventPlace}</p>
            <p>{formattedEventDate}</p>
            <p>{clientName}</p>
          </div>
        </div>

        <div className="columns-1 gap-6 md:columns-2">
          {imagePaths?.[0] && imagePaths.map((imagePath, index) => (
            <Image
              key={`WorkAlbumImage-${index}`}
              src={imagePath}
              width={650}
              height={650}
              className='rounded-xl w-full rounded-tr-none rounded-bl-none my-6 shadow-xl'
              alt=''
            />
          ))}
        </div>
      </div>

      {(authState.isAdmin) && <>
        <WorkAlbumUpdateModal
          modalId={`WorkAlbumUpdateModal-${recordId}`}
          workAlbum={workAlbum}
          packages={packages}
        />

        <RecordDeleteModal
          modalId={`WorkAlbumDeleteModal-${recordId}`}
          collectionName={'work_albums'}
          recordId={recordId}
        />
      </>}
    </>
  )
}
