"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';
import { Parser as CsvParser } from '@json2csv/plainjs';
import dayjs from 'dayjs';
import { toast } from 'sonner';

// Ap imports
import useGetInquiriesTable from '@hooks/admin/useGetInquiriesTable';
import revalidateAllData from '@services/shared/revalidateAllData';

export default function InquiriesTable(props) {
  const { inquiries, setState } = props
  const { flexRender, inquiriesTable, globalFilter, setGlobalFilter, pageRef } = useGetInquiriesTable({ inquiries })

  async function onRefreshTable() { 
    await revalidateAllData()
    toast.info('Revalidated all data.')
  }

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

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-2">
        <div className="flex">
          <label className='me-4 rounded-box bg-primary text-white p-1 px-3 font-bold max-w-xs uppercase text-sm'>Global filter</label>
          <a className="flex btn btn-primary btn-outine btn-sm text-white sm:hidden" onClick={onExportToCsv}>Export to CSV</a>
        </div>
        <input
          type="text"
          className="input input-sm input-bordered input-primary w-full max-w-[17rem]"
          placeholder='Search record'
          value={globalFilter}
          onChange={onGlobalFilterChange}
        />
        <div className="tooltip mt-5 sm:mt-0 sm:ms-5 sm:me-auto" data-tip="Refresh data">
          <FontAwesomeIcon icon={faArrowsRotate} size='xl' className='text-primary cursor-pointer' onClick={onRefreshTable} />
        </div>
        <a className="hidden btn btn-primary btn-outline btn-sm text-white sm:flex" onClick={onExportToCsv}>Export to CSV</a>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols md:table-md">
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

      <div className="flex justify-center mt-8 text-white font-black text-lg ">
        <div className="join">
          <button className="join-item btn btn-primary" onClick={onFirstPagePagination}>«</button>
          <button className="join-item btn btn-primary" onClick={onPreviousPagePagination}>{'<'}</button>
          <div className="join-item mx-auto px-5 bg-primary flex">
            <input
              type="number"
              className="input text-primary text-center max-w-[5rem] sm:max-w-[10rem]"
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
