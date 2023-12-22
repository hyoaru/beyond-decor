import React from 'react'

// App imports
import InquiriesFeed from './InquiriesFeed'
import getInquiries from '@services/shared/getInquiries'

export default async function Page() {
  const { data: inquiries, error } = await getInquiries()

  return (
    <>
      <div className="mx-6 my-10 md:my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Inquiries</span>
          </h1>
        </div>

        <InquiriesFeed inquiries={inquiries} />
      </div>
    </>
  )
}
