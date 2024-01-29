"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import dayjs from 'dayjs'

// App imports
import MetricCard from '@components/admin/MetricCard'
import getInquiriesByDateRange from '@services/shared/getInquiriesByDateRange'

export default function DashboardOverviewFeed(props) {
  const { initialInquiries, packages } = props
  const [inquiries, setInquiries] = useState(initialInquiries)
  const { register, getValues } = useForm({
    defaultValues: {
      startDate: dayjs('2024-01-01').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD')
    }
  })

  async function onDateRangeChange() {
    const startDate = getValues('startDate')
    const endDate = getValues('endDate')

    if (startDate && endDate) {
      await getInquiriesByDateRange({
        startDate: startDate,
        endDate: endDate
      })
        .then(({ data, error }) => {
          if (error) {
            toast.error('An error has occured.')
          } else {
            setInquiries(data)
            toast.success(`Aggregated data from ${startDate} to ${endDate}`)
          }
        })
    }
  }

  return (
    <>
      <div className="">
        <div className="flex flex-col md:flex-row items-center mb-10 gap-y-3">
          <h3 className='text-4xl text-center font-bold md:me-auto'>Inquiries Dashboard</h3>
          <div className="flex items-center gap-x-4">
            <div className="rounded-box p-1 border">
              <input
                type="date"
                className='input input-sm'
                {...register('startDate', { onChange: onDateRangeChange })}
              />
              {'-'}
              <input
                type="date"
                className='input input-sm'
                {...register('endDate', { onChange: onDateRangeChange })}
              />
            </div>
          </div>
        </div>

        <div className="whitespace-nowrap overflow-x-auto">
          <div className="mx-auto flex gap-4">
            <MetricCard label={'Inquiries'} data={inquiries.length} />
            {packages.map((_package) => {
              const label = _package.title
              const data = inquiries.filter(
                (inquiry) => _package?.id === inquiry.main_package)
                .length
              return <MetricCard key={`MetricCard-${_package.id}`} label={label} data={data} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}
