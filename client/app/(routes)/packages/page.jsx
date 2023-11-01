"use client";

// App imports
import Packages from './Packages'
import AddOns from './AddOns';
import { useAuthStateContext } from '../../_context';

export default function page() {
  const authState = useAuthStateContext()
  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            {'Discover '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>our selection</span>
          </h1>
          <p className='mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12'>
            Beyond Decor offers a diverse selection of four distinct packages to cater to varying event needs. From the straightforward Basic Package to the immersive Themed Package, as well as the elaborate Full Backdrop Package and comprehensive Full Venue Package, each option is meticulously designed to ensure that every event is transformed into a memorable and stunning experience.
          </p>
        </div>

        <Packages isAdmin={authState.isAdmin} />
        <AddOns isAdmin={authState.isAdmin} />
      </div>
    </>
  )
}
