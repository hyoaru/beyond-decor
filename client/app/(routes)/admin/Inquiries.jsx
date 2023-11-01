"use client";

import React, { useEffect, useRef, useState } from 'react'

// App imports
import useGetInquiries from '../../_hooks/shared/useGetInquiries';
import InquiriesTable from '../../_components/admin/InquiriesTable';
import InquiryDetailsModal from '../../_components/admin/InquiryDetailsModal';

export default function Inquiries(props) {
  const { fetchInquiries, inquiries, isLoading, error } = useGetInquiries({ collectionName: 'inquiries', defaultValue: [] })
  const [_, setState] = useState()

  useEffect(() => {
    fetchInquiries()
  }, [_])

  return (
    <>
      <InquiriesTable inquiries={inquiries} setState={setState} />

      {inquiries && inquiries.map((inquiry) => (
        <InquiryDetailsModal
          key={`InquiryDetailsModal-${inquiry.id}`}
          inquiry={inquiry}
          modalId={`InquiryDetailsModal-${inquiry.id}`}
        />
      ))}
    </>
  )
}
