import React, { useEffect, useRef, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';

export default function useGetInquiriesTable({ inquiries, setState }) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const pageRef = useRef(0)

  function ViewInquiryDetailsButton(props) {
    const { inquiryId, children } = props
    return (
      <button
        className='btn btn-primary btn-xs btn-outline'
        onClick={() => onViewInquiryDetailsModal(inquiryId)}
      >
        {children}
      </button>
    )
  }

  function onViewInquiryDetailsModal(inquiryId) {
    document.getElementById(`InquiryDetailsModal-${inquiryId}`).showModal()
  }

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'full_name' }, { accessorKey: 'email_address' },
    { accessorKey: 'facebook_link' }, { accessorKey: 'phone_number' }, { accessorKey: 'event_date' },
    { accessorFn: (row) => (row.expand.main_package?.title ?? null), header: 'main_package' },
    { accessorKey: 'acquisition_survey', header: 'how_they_heard_about_byd'},
    { accessorKey: 'created', header: 'created_at'},
    { id:'ViewOtherDetails', accessorKey: 'id', header: 'other_details', cell: (info) => (<ViewInquiryDetailsButton inquiryId={info.getValue()}>View</ViewInquiryDetailsButton>) }
  ]

  const inquiriesTable = useReactTable({
    state: { sorting: sorting, globalFilter: globalFilter },
    columns: columnDefinition,
    data: inquiries,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })


  return { inquiriesTable, globalFilter, setGlobalFilter, pageRef, flexRender }
}
