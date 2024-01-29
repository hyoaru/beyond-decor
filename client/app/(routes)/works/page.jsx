import WorkAlbumsFeed from './WorkAlbumsFeed'
import getWorkAlbums from '@services/works/getWorkAlbums';
import getAuthState from '@services/authentication/getAuthState';
import TriggerModalButton from '@components/shared/TriggerModalButton';
import WorkAlbumAddModal from '@components/works/WorkAlbumAddModal';
import getAllPackages from '@services/shared/getAllPackages';

export default async function Page({ searchParams }) {
  const { data: workAlbums, error } = await getWorkAlbums()
  const { data: packages } = await getAllPackages()
  const authState = await getAuthState()

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="grid gap-6 items-center md:grid-cols-2 md:gap-14 lg:gap-24">
          <div className="prose max-w-none text-center md:text-right md:justify-self-end md:prose-lg lg:w-10/12 xl:w-7/12">
            <h1 className='leading-normal md:leading-snug'>
              {"What we've "}
              <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>served</span>
              {" so far"}
            </h1>
          </div>
          <div className="text-center justify-self-start md:text-left lg:w-10/12 xl:w-7/12">
            <p>Beyond Decor delivers with unwavering dedication and creativity. We meticulously craft every detail, curate every experience, and ensure your vision is brought to life. Our team combines expertise with an artful touch, transforming ordinary events into extraordinary memories. </p>
          </div>
        </div>

        {authState.isAdmin && <>
          <div className="text-center mt-10">
            <TriggerModalButton modalIdToTrigger={'WorkAlbumAddModal'}>
              {'[ add album ]'}
            </TriggerModalButton>
          </div>
        </>}

        <WorkAlbumsFeed
          workAlbums={workAlbums}
          packages={packages}
          filterBySearchParam={searchParams.filterBy}
        />
      </div>
      
      {authState.isAdmin && <>
        <WorkAlbumAddModal packages={packages} />
      </>}
    </>
  )
}
