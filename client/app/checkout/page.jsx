"use client";

import Link from "next/link";

// App imports 
import RequiredFieldLayout from "../components/checkout/RequiredFieldLayout"
import Bag from "../components/checkout/Bag";
import { useBagStore } from "../store/Bag";

export default function page() {
  const { mainPackage, addOns, removeAddOn, removeMainPackage, getTotalPrice } = useBagStore()

  return (
    <>
      <div className="mx-6 my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Get a quote</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 mx-auto md:grid-cols-2 md:w-11/12 lg:w-9/12 xl:w-8/12 mt-14 gap-x-10">
          <div className="col-span-1">
            <div className="mb-8">
              <p className='font-bold text-primary mb-2'>Information about you</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <RequiredFieldLayout>
                  <input type="text" placeholder="Full name" className="input input-bordered w-full" required />
                </RequiredFieldLayout>

                <input type="text" placeholder="Phone number" className="input input-bordered w-full" required />

                <RequiredFieldLayout>
                  <input type="text" placeholder="Email address" className="input input-bordered w-full" required />
                </RequiredFieldLayout>

                <RequiredFieldLayout>
                  <input type="text" placeholder="Facebook link" className="input input-bordered w-full" required />
                </RequiredFieldLayout>
              </div>
            </div>

            <div className="mb-8">
              <p className='font-bold text-primary mb-2'>Event information</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <RequiredFieldLayout>
                  <input type="text" placeholder="Occasion" className="input input-bordered w-full" />
                </RequiredFieldLayout>
                
                <RequiredFieldLayout>
                  <input type="text" placeholder="Location/Venue" className="input input-bordered w-full" />
                </RequiredFieldLayout>

                <div className="md:col-span-2">
                  <div className="divider m-0 my-2"><small className='text-primary font-bold'>Event date</small></div>
                  <RequiredFieldLayout>
                    <input type="date" placeholder="Event date" className="input input-bordered w-full" />
                  </RequiredFieldLayout>
                </div>
                
                <div className="md:col-span-2">
                  <div className="divider m-0 my-2"><small className='text-primary font-bold'>Preferred design / theme</small></div>
                  <textarea placeholder="Describe preferred design" className="textarea textarea-bordered w-full"></textarea>
                  <small className="block my-2">
                    You may choose to upload sample peg designs or you may also check our {' '}
                    <span className='text-primary underline tooltip' data-tip="www.facebook.com/beyonddecorph">
                      <a href="https://www.facebook.com/beyonddecorph" target="_blank">
                        facebook page
                      </a>
                    </span>
                  </small>
                  <input
                    type="file"
                    accept='.jpg, .jpeg, .png'
                    className="file-input file-input-bordered file-input-primary w-full"
                    multiple
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="mb-8">
              <Bag 
                mainPackage={mainPackage}
                addOns={addOns}
                removeAddOn={removeAddOn}
                removeMainPackage={removeMainPackage}
                getTotalPrice={getTotalPrice}
              />
            </div>

            <div className="">
              <div className="divider">
                <small className="font-bold text-primary">How did you hear about Beyond Decor</small>
              </div>
              <textarea className="textarea textarea-primary w-full" placeholder="Facebook? Co-workers? Relatives?"></textarea>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 mt-6">
            <button className="btn btn-primary btn-lg font-bold text-white flex w-full">Checkout</button>
          </div>
        </div>
      </div>
    </>
  )
}
