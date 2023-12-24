import React from 'react'

// App imports
import InquiriesFeed from './InquiriesFeed'
import getInquiries from '@services/shared/getInquiries'
import DashboardOverviewFeed from './DashboardOverviewFeed'
import getPackages from '@services/shared/getPackages'

export default async function Page() {
  const { data: inquiries, error } = await getInquiries()
  const { data: packages } = await getPackages()

  return (
    <>
      <div className="px-4 mx-auto mt-10 md:mt-16 xl:container">
        <DashboardOverviewFeed initialInquiries={inquiries} packages={packages} />

        <div className="my-16 md:my-8">
          <InquiriesFeed inquiries={inquiries} />
        </div>
      </div>
    </>
  )
}
