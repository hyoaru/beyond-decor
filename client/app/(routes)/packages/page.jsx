import getAuthState from '@services/authentication/getAuthState';
import TriggerModalButton from '@components/shared/TriggerModalButton';
import getPackages from '@services/shared/getPackages';
import AddOnsFeed from './AddOnsFeed';
import PackagesFeed from './PackagesFeed';
import getAddOns from '@services/packages/getAddons';

export default async function Page() {
  const authState = await getAuthState()
  const { data: packages, error } = await getPackages()
  const { data: addOns } = await getAddOns()

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            {'Discover '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>our selection</span>
          </h1>
          <p className='mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12'>
            Beyond Decor offers a diverse selection of four distinct packages to cater to varying event needs.
            From the straightforward Basic Package to the immersive Themed Package, as well as the elaborate Full Backdrop Package and comprehensive
            Full Venue Package, each option is meticulously designed to ensure that every event is transformed into a memorable and stunning experience.
          </p>
        </div>

        {authState.isAdmin && <>
          <div className="text-center mt-20">
            <TriggerModalButton modalIdToTrigger={'AddPackageCardModal'}>
              {'[ add package ]'}
            </TriggerModalButton>
          </div>
        </>}

        <PackagesFeed packages={packages} isAdmin={authState.isAdmin} />

        <div className="mt-32 mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12">
          <div className="prose prose-sm sm:prose-md md:prose-lg max-w-none">
            <h1 className='m-0 text-center leading-normal'>
              {'Other event upgrades: '}
              <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Add-ons</span>
            </h1>
          </div>

          {authState.isAdmin && <>
            <div className="text-center mt-10">
              <TriggerModalButton modalIdToTrigger={'AddAddOnsModal'}>
                {'[ add add-ons ]'}
              </TriggerModalButton>
            </div>
          </>}
        </div>

        <AddOnsFeed addOns={addOns} isAdmin={authState.isAdmin} />
      </div>
    </>
  )
}
