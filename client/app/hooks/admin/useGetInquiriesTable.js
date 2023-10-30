import React, { useEffect, useRef, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';

export default function useGetInquiriesTable({ inquiries, setState }) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const pageRef = useRef(0)

  const columnDefinition = [
    { accessorKey: 'id' }, { accessorKey: 'full_name' }, { accessorKey: 'email_address' }, { accessorKey: 'facebook_link' },
    { accessorKey: 'phone_number' }, { accessorKey: 'event_date' }, { accessorFn: (row) => (row.main_package?.title ?? null), header: 'main_package' },
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
