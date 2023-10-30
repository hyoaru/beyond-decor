"use client";

import React, { useEffect, useRef, useState } from 'react'

// App imports
import useGetInquiries from '../hooks/shared/useGetInquiries';
import InquiriesTable from '../components/admin/InquiriesTable';

export default function Inquiries(props) {
  const { fetchInquiries, inquiries, isLoading, error } = useGetInquiries({ collectionName: 'inquiries', defaultValue: [] })
  const [_, setState] = useState()

  useEffect(() => {
    fetchInquiries()
  }, [_])

  return (
    <>
      <InquiriesTable inquiries={inquiries} setState={setState} />
    </>
  )
}
