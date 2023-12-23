"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import dayjs from 'dayjs'

// App imports
import FormErrorMessage from '@components/shared/FormErrorMessage'
import revalidateAllData from '@services/shared/revalidateAllData'
import { ADD_INQUIRY_BASE_FORM_SCHEMA as formSchema } from '@constants/checkout/forms'
import RequiredFieldLayout from '@components/checkout/RequiredFieldLayout'
import Bag from '@components/checkout/Bag'
import useAddInquiry from '@hooks/checkout/useAddInquiry'
import { useBagStore } from '@store/Bag'
import CheckoutSubmitStatusModal from './CheckoutSubmitStatusModal'
import { sendInquiryDetailsEmail } from '@services/checkout/sendInquiryDetailsEmail'
import processInquiry from '@libraries/shared/processInquiry'

export default function CheckoutForm(props) {
  const { inquiries } = props
  const [eventDateInConflictCount, setEventDateInConflictCount] = useState(0)
  const { addInquiry, isLoading } = useAddInquiry()
  const { mainPackage, addOns, getTotalPrice } = useBagStore()
  const [inquiryError, setInquiryError] = useState()
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      facebookLink: '',
      eventType: '',
      eventPlace: '',
      eventDate: '',
      acquisitionSurvey: '',
      preferredDesignDescription: '',
      preferredDesignSamples: '',
    }
  })

  async function eventDateOnChange() {
    if (inquiries.length <= 0) { return }
    const formattedEventDate = dayjs(getValues('eventDate')).format('YYYY-MM-DD')
    const filteredInquiries = inquiries.filter((inquiry) => (
      formattedEventDate === dayjs(inquiry.event_date).format('YYYY-MM-DD')
    ))

    setEventDateInConflictCount(filteredInquiries.length)
  }

  function resetFields() {
    document.querySelector('#preferredDesignSamplesInput').value = null
    reset()
  }

  function showStatusModal() {
    document.getElementById('CheckoutSubmitStatusModal').showModal()
  }

  async function onSubmit(data) {
    if (!mainPackage) {
      toast.error('Please choose a package.')
    } else {
      const emailAddress = data.emailAddress
      await addInquiry({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress,
        facebookLink: data.facebookLink,
        eventType: data.eventType,
        eventPlace: data.eventPlace,
        eventDate: data.eventDate,
        acquisitionSurvey: data.acquisitionSurvey,
        preferredDesignDescription: data.preferredDesignDescription,
        preferredDesignSamples: data.preferredDesignSamples,
        mainPackage: mainPackage,
        addOns: addOns,
        itemsTotalCost: getTotalPrice()
      })
        .then(async ({ data, error }) => {
          if (error) {
            setInquiryError(error)
            showStatusModal()
          } else {
            setIsTransactionLoading(true)
            await sendInquiryDetailsEmail({
              to: `${emailAddress}, beyonddecordev1@gmail.com`,
              from: "beyonddecordev1@gmail.com",
              subject: "Beyond Decor Inquiry",
              inquiry: processInquiry(data)
            })

            await revalidateAllData()
            resetFields()
            showStatusModal()
            setIsTransactionLoading(false)
          }
        })
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
                  <div className="">
                    <RequiredFieldLayout>
                      <input
                        type="text"
                        placeholder="Full name"
                        className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
                        {...register('fullName')}
                      />
                    </RequiredFieldLayout>
                    {errors.fullName && <>
                      <FormErrorMessage>{errors.fullName.message}</FormErrorMessage>
                    </>}
                  </div>

                  <div className="">
                    <input
                      type="text"
                      placeholder="Phone number"
                      className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : ''}`}
                      {...register('phoneNumber')}
                    />
                    {errors.phoneNumber && <>
                      <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
                    </>}
                  </div>

                  <div className="">
                    <RequiredFieldLayout>
                      <input
                        type="email"
                        placeholder="Email address"
                        className={`input input-bordered w-full ${errors.emailAddress ? 'input-error' : ''}`}
                        {...register('emailAddress')}
                      />
                    </RequiredFieldLayout>
                    {errors.emailAddress && <>
                      <FormErrorMessage>{errors.emailAddress.message}</FormErrorMessage>
                    </>}
                  </div>

                  <div className="">
                    <RequiredFieldLayout>
                      <input
                        type="text"
                        placeholder="Facebook link"
                        className={`input input-bordered w-full ${errors.facebookLink ? 'input-error' : ''}`}
                        {...register('facebookLink')}
                      />
                    </RequiredFieldLayout>
                    {errors.facebookLink && <>
                      <FormErrorMessage>{errors.facebookLink.message}</FormErrorMessage>
                    </>}
                  </div>

                </div>
              </div>
              <div className="mb-8">
                <p className='font-bold text-primary mb-2'>Event information</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="">
                    <RequiredFieldLayout>
                      <input
                        type="text"
                        placeholder="Occasion"
                        className={`input input-bordered w-full ${errors.eventType ? 'input-error' : ''}`}
                        {...register('eventType')}
                      />
                    </RequiredFieldLayout>
                    {errors.eventType && <>
                      <FormErrorMessage>{errors.eventType.message}</FormErrorMessage>
                    </>}
                  </div>

                  <div className="">
                    <RequiredFieldLayout>
                      <input
                        type="text"
                        placeholder="Location/Venue"
                        className={`input input-bordered w-full ${errors.eventPlace ? 'input-error' : ''}`}
                        {...register('eventPlace')}
                      />
                    </RequiredFieldLayout>
                    {errors.eventPlace && <>
                      <FormErrorMessage>{errors.eventPlace.message}</FormErrorMessage>
                    </>}
                  </div>

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
                        className={`input input-bordered w-full ${errors.eventDate ? 'input-error' : ''}`}
                        {...register('eventDate', { onChange: eventDateOnChange })}
                      />
                    </RequiredFieldLayout>
                    {errors.eventDate && <>
                      <FormErrorMessage>{errors.eventDate.message}</FormErrorMessage>
                    </>}
                  </div>

                  <div className="md:col-span-2">
                    <div className="divider m-0 my-2">
                      <small className='text-primary font-bold'>Preferred design / theme</small>
                    </div>
                    <textarea
                      placeholder="Describe preferred design"
                      className={`textarea textarea-bordered w-full ${errors.preferredDesignDescription ? 'textarea-error' : ''}`}
                      {...register('preferredDesignDescription')}>
                    </textarea>
                    {errors.preferredDesignDescription && <>
                      <FormErrorMessage>{errors.preferredDesignDescription.message}</FormErrorMessage>
                    </>}

                    <small className="block my-2">
                      You may choose to upload <span className="font-bold">up to 3 sample peg designs</span> or you may also check our {' '}
                      <span className='text-primary font-bold underline tooltip' data-tip="www.facebook.com/beyonddecorph">
                        <a href="https://www.facebook.com/beyonddecorph" target="_blank">
                          facebook page
                        </a>
                      </span>
                    </small>

                    <input
                      id='preferredDesignSamplesInput'
                      type="file"
                      accept='.jpg, .jpeg, .png'
                      className={`file-input file-input-bordered file-input-primary w-full ${errors.preferredDesignSamples ? 'input-error' : ''}`}
                      {...register('preferredDesignSamples')}
                      multiple
                    />
                    {errors.preferredDesignSamples && <>
                      <FormErrorMessage>{errors.preferredDesignSamples.message}</FormErrorMessage>
                    </>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-8">
                <Bag />
              </div>
              <div className="">
                <div className="divider">
                  <small className="font-bold text-primary">How did you hear about Beyond Decor</small>
                </div>
                <textarea
                  className={`textarea textarea-primary w-full ${errors.acquisitionSurvey ? 'textarea-error' : ''}`}
                  placeholder="Facebook? Co-workers? Relatives?"
                  {...register('acquisitionSurvey')}>
                </textarea>
                {errors.acquisitionSurvey && <>
                  <FormErrorMessage>{errors.acquisitionSurvey.message}</FormErrorMessage>
                </>}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 mt-6">
              <button
                type="submit"
                className="btn btn-primary btn-lg font-bold text-white flex w-full"
                disabled={isLoading | isTransactionLoading}
              >
                {
                  isLoading | isTransactionLoading
                    ? <span className='loading loading-ring loading-lg text-black'></span>
                    : 'Checkout'
                }
              </button>
            </div>
          </div>
        </form>
      </div>

      <CheckoutSubmitStatusModal error={inquiryError} />
    </>
  )
}
