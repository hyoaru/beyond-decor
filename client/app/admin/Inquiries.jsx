"use client";

import React, { useEffect, useRef, useState } from 'react'
import { flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { saveAs } from 'file-saver';
import { Parser as CsvParser } from '@json2csv/plainjs';
import dayjs from 'dayjs';

// App imports
import useGetInquiries from '../hooks/admin/useGetInquiries';

export default function Inquiries(props) {
  const { fetchInquiries, inquiries, isLoading, error } = useGetInquiries({ collectionName: 'inquiries', defaultValue: [] })
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const pageRef = useRef(0)
  const [_, setState] = useState()

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


  function onGlobalFilterChange(event) { setGlobalFilter(event.target.value) }

  function onFirstPagePagination() {
    pageRef.current = 0
    inquiriesTable.setPageIndex(pageRef.current)
  }

  function onLastPagePagination() {
    pageRef.current = inquiriesTable.getPageCount() - 1
    inquiriesTable.setPageIndex(pageRef.current)
  }

  function onNextPagePagination() {
    if (!inquiriesTable.getCanNextPage()) { return }
    pageRef.current = inquiriesTable.options.state.pagination.pageIndex + 1
    inquiriesTable.setPageIndex(pageRef.current)
  }

  function onPreviousPagePagination() {
    if (!inquiriesTable.getCanPreviousPage()) { return }
    pageRef.current = inquiriesTable.options.state.pagination.pageIndex - 1
    inquiriesTable.setPageIndex(pageRef.current)
  }

  function onPageJump(event) {
    pageRef.current = event.target.value
    inquiriesTable.setPageIndex(pageRef.current)
  }

  function onExportToCsv() {
    try {
      const csvParser = new CsvParser()
      const dataCsvFile = csvParser.parse(inquiries ?? {})
      const dateNow = dayjs().format('YYYY-MM-DD')
      const fileName = `BeyondDecor_Inquiries_${dateNow}.csv`
      const file = new File([dataCsvFile], fileName, { 'type': 'text/csv;charset=utf-8' })
      saveAs(file)
    } catch (error) {
      alert(error.message)
    }

  }

  useEffect(() => {
    fetchInquiries()
  }, [_])

  return (
    <>
      <div className="mt-16 mx-4 md:mx-16 lg:mx-32 mb-6 flex flex-col sm:flex-row items-center gap-2">
        <label className='me-4 rounded-box bg-primary text-white p-1 px-3 font-bold max-w-xs'>Global filter</label>
        <input
          type="text"
          className="input input-sm input-bordered input-primary w-full max-w-[17rem] sm:me-auto"
          placeholder='Search record'
          value={globalFilter}
          onChange={onGlobalFilterChange}
        />
        <a className="btn btn-primary btn-sm text-white" onClick={onExportToCsv}>Export to CSV</a>
      </div>

      <div className="overflow-x-auto mx-4 md:mx-16 lg:mx-32">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            {inquiries && inquiriesTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className='text-base-400 hover:text-primary'>
                    <div
                      className={`${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: ' ⏶', desc: ' ⏷' }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {inquiries && inquiriesTable.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-16 text-white font-black text-lg">
        <div className="join">
          <button className="join-item btn btn-primary" onClick={onFirstPagePagination}>«</button>
          <button className="join-item btn btn-primary" onClick={onPreviousPagePagination}>{'<'}</button>
          <div className="join-item mx-auto px-5 bg-primary flex">
            <input
              type="number"
              className="input text-primary text-center max-w-[10rem]"
              value={pageRef.current}
              onChange={onPageJump}
            />
          </div>
          <button className="join-item btn btn-primary" onClick={onNextPagePagination}>{'>'}</button>
          <button className="join-item btn btn-primary" onClick={onLastPagePagination}>»</button>
        </div>
      </div>
    </>
  )
}
