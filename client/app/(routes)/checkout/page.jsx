"use client";

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

// App imports 
import RequiredFieldLayout from "../../_components/checkout/RequiredFieldLayout"
import Bag from "../../_components/checkout/Bag";
import { useBagStore } from "../../_store/Bag";
import { useForm } from "react-hook-form";
import { useCollectionRecordCreate } from "../../_hooks/shared/useCollectionRecordCreate";
import CheckoutSubmitStatusModal from "../../_components/checkout/CheckoutSubmitStatusModal";
import useGetInquiries from "../../_hooks/shared/useGetInquiries";
import processInquiries from "../../_libraries/shared/processInquiries";
import { resizeImage } from "@/app/_libraries/shared/resizeImage";

export default function page() {
  const { mainPackage, addOns, removeAddOn, removeMainPackage, getTotalPrice } = useBagStore()
  const { fetchInquiries, inquiries, isLoading: inquiriesIsLoading, error: inquiriesError } = useGetInquiries({ collectionName: 'inquiries' })
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordCreate, isLoading, error } = useCollectionRecordCreate({ collectionName: 'inquiries' })
  const [eventDateInConflictCount, setEventDateInConflictCount] = useState(0)
  const [_, setState] = useState()

  useEffect(() => {
    fetchInquiries()
  }, [_])

  async function eventDateOnChange() {
    if (inquiries.length <= 0) { return }
    const formattedEventDate = dayjs(getValues('eventDateInput')).format('YYYY-MM-DD')
    const filteredInquiries = inquiries.filter((inquiry) => (
      formattedEventDate === dayjs(inquiry.event_date).format('YYYY-MM-DD')
    ))
    setEventDateInConflictCount(filteredInquiries.length)
  }

  function onPreferredDesignSamplesInputChange () {
    const imageCount = Array.from(getValues('preferredDesignSamplesInput')).length
    if (imageCount > 3) {
      alert("You can only upload up to 3 sample peg designs")
      resetField("preferredDesignSamplesInput")
    }
  }

  function sendInquiryDetailsToEmail({ emailAddress, inquiry }) {
    fetch('/api/checkout/InquiryDetailsEmail', {
      method: "POST",
      body: JSON.stringify({
        to: `${emailAddress}, beyonddecordev1@gmail.com`,
        from: "beyonddecordev1@gmail.com",
        subject: "Beyond Decor Inquiry",
        inquiry: inquiry
      })
    })
  }

  async function onSubmit(data) {
    try {
      const fullName = data.fullNameInput
      const phoneNumber = data.phoneNumberInput
      const emailAddress = data.emailAddressInput
      const facebookLink = data.facebookLinkInput
      const eventType = data.eventTypeInput
      const eventPlace = data.eventPlaceInput
      const eventDate = data.eventDateInput
      const preferredDesignDescription = data.preferredDesignDescriptionInput
      const preferredDesignSamples = data.preferredDesignSamplesInput
      const acquisitionSurvey = data.acquisitionSurveyInput
      const itemsTotalCost = getTotalPrice()
  
      const formData = new FormData()
      formData.append('full_name', fullName)
      formData.append('phone_number', phoneNumber)
      formData.append('email_address', emailAddress)
      formData.append('facebook_link', facebookLink)
      formData.append('event_type', eventType)
      formData.append('event_place', eventPlace)
      formData.append('event_date', eventDate)
      formData.append('preferred_design_description', preferredDesignDescription)
      formData.append('acquisition_survey', acquisitionSurvey)
      formData.append('items_total_cost', itemsTotalCost)
      Array.from(preferredDesignSamples).forEach(async (imageFile) => {
        formData.append('preferred_design_samples', await resizeImage(imageFile))
      })
  
      if (mainPackage) {
        const mainPackageStripped = { title: mainPackage.title, price: mainPackage.price }
        formData.append('main_package', JSON.stringify(mainPackageStripped))
      }
  
      if (addOns.length > 0) {
        const addOnsStripped = addOns.map((addOn) => { return { title: addOn.title, price: addOn.price } })
        formData.append('add_ons', JSON.stringify(addOnsStripped))
      }
  
      await collectionRecordCreate({ formData: formData })
        .then((inquiryRes) => (processInquiries({ collectionName: 'inquiries', inquiries: [inquiryRes] })))
        .then((processedInquiries) => {
          sendInquiryDetailsToEmail({
            emailAddress: processedInquiries[0]?.email_address,
            inquiry: processedInquiries[0]
          })
        })
  
      setState(performance.now())
      document.getElementById('CheckoutSubmitStatusModal').showModal()
      reset()
      
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Get a quote</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 mx-auto md:grid-cols-2 md:w-11/12 lg:w-9/12 xl:w-8/12 mt-14 gap-x-10">
            <div className="col-span-1">
              <div className="mb-8">
                <p className='font-bold text-primary mb-2'>Information about you</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <RequiredFieldLayout>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="input input-bordered w-full"
                      {...register('fullNameInput')}
                      required
                    />
                  </RequiredFieldLayout>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="input input-bordered w-full"
                    {...register('phoneNumberInput')}
                    required
                  />
                  <RequiredFieldLayout>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="input input-bordered w-full"
                      {...register('emailAddressInput')}
                      required
                    />
                  </RequiredFieldLayout>
                  <RequiredFieldLayout>
                    <input
                      type="text"
                      placeholder="Facebook link"
                      className="input input-bordered w-full"
                      {...register('facebookLinkInput')}
                      required
                    />
                  </RequiredFieldLayout>
                </div>
              </div>
              <div className="mb-8">
                <p className='font-bold text-primary mb-2'>Event information</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <RequiredFieldLayout>
                    <input
                      type="text"
                      placeholder="Occasion"
                      className="input input-bordered w-full"
                      {...register('eventTypeInput')}
                      required
                    />
                  </RequiredFieldLayout>

                  <RequiredFieldLayout>
                    <input
                      type="text"
                      placeholder="Location/Venue"
                      className="input input-bordered w-full"
                      {...register('eventPlaceInput')}
                      required
                    />
                  </RequiredFieldLayout>
                  <div className="md:col-span-2">
                    <div className="divider m-0 my-2">
                      <small className='text-primary font-bold'>Event date</small>
                    </div>

                    {eventDateInConflictCount > 0 && <>
                      <small className="text-error block mb-2 font-bold">{`${eventDateInConflictCount} event(s) booked this day`}</small>
                    </>}
                    <RequiredFieldLayout>
                      <input
                        type="date"
                        placeholder="Event date"
                        className="input input-bordered w-full"
                        {...register('eventDateInput', { onChange: eventDateOnChange })}
                        required
                      />
                    </RequiredFieldLayout>
                  </div>

                  <div className="md:col-span-2">
                    <div className="divider m-0 my-2">
                      <small className='text-primary font-bold'>Preferred design / theme</small>
                    </div>
                    <textarea
                      placeholder="Describe preferred design"
                      className="textarea textarea-bordered w-full"
                      {...register('preferredDesignDescriptionInput')}>
                    </textarea>

                    <small className="block my-2">
                      You may choose to upload <span className="font-bold">up to 3 sample peg designs</span> or you may also check our {' '}
                      <span className='text-primary font-bold underline tooltip' data-tip="www.facebook.com/beyonddecorph">
                        <a href="https://www.facebook.com/beyonddecorph" target="_blank">
                          facebook page
                        </a>
                      </span>
                    </small>

                    <input
                      type="file"
                      accept='.jpg, .jpeg, .png'
                      className="file-input file-input-bordered file-input-primary w-full"
                      {...register('preferredDesignSamplesInput', {onChange: onPreferredDesignSamplesInputChange})}
                      multiple
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
                <textarea
                  className="textarea textarea-primary w-full"
                  placeholder="Facebook? Co-workers? Relatives?"
                  {...register('acquisitionSurveyInput')}>
                </textarea>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 mt-6">
              <input
                type="submit"
                className="btn btn-primary btn-lg font-bold text-white flex w-full"
                value={"Checkout"}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <CheckoutSubmitStatusModal error={error} />
    </>
  )
}
