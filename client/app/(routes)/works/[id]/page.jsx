import dayjs from 'dayjs'
import Image from 'next/image'

// App imports
// import useGetWorkAlbum from '@/app/_hooks/works/useGetWorkAlbum'
// import { useAuthStateContext } from '@/app/_context'
import WorkAlbumUpdateModal from '@/app/_components/works/WorkAlbumUpdateModal'
import WorkAlbumDeleteModal from '@/app/_components/works/WorkAlbumDeleteModal'
// import useGetPackages from '@/app/_hooks/packages/useGetPackages'
// import Loading from '../loading'
import { notFound } from 'next/navigation'
import getWorkAlbum from '@/app/_services/works/getWorkAlbum'
import getPackages from '@/app/_services/shared/getPackages'
import getAuthState from '@/app/_services/authentication/getAuthState'
import WorkAlbumDropdownAction from '@/app/_components/works/WorkAlbumDropdownAction'

export default async function Page({ params }) {
  const { data: workAlbum, error } = await getWorkAlbum({ recordId: params?.id })
  const { data: packages } = await getPackages()
  const authState = await getAuthState()
  const { id: recordId, event_name: eventName, event_place: eventPlace, event_date: eventDate } = workAlbum
  const { client_name: clientName, thumbnail_path: thumbnailPath, image_paths: imagePaths } = workAlbum
  const formattedEventDate = dayjs(eventDate).format("MMMM DD, YYYY")

  if (error) {
    return (notFound())
  }

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
          {imagePaths && imagePaths.map((imagePath, index) => (
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

        <WorkAlbumDeleteModal
          modalId={`WorkAlbumDeleteModal-${recordId}`}
          recordId={recordId}
          thumbnailSrc={thumbnailPath}
          eventName={eventName}
        />
      </>}
    </>
  )
}
