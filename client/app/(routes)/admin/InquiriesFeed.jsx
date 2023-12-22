"use client";

import React, { useEffect, useRef, useState } from 'react'

// App imports
import InquiriesTable from '@components/admin/InquiriesTable';
import InquiryDetailsModal from '@components/admin/InquiryDetailsModal';

export default function InquiriesFeed(props) {
  const { inquiries } = props

  return (
    <>
      <InquiriesTable inquiries={inquiries} />

      {inquiries?.[0] && inquiries.map((inquiry) => (
        <InquiryDetailsModal
          key={`InquiryDetailsModal-${inquiry.id}`}
          inquiry={inquiry}
          modalId={`InquiryDetailsModal-${inquiry.id}`}
        />
      ))}
    </>
  )
}
