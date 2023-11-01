import { NextRequest, NextResponse } from "next/server"
import { sendInquiryDetailsEmail } from "@/app/services/checkout/sendInquiryDetailsEmail"

export async function POST(req) {
  const body = await req.json()
  const { to, from, subject, inquiry } = body
  
  try {
    await sendInquiryDetailsEmail({ to: to, from: from, subject: subject, inquiry: inquiry, })
    return NextResponse.json({ message: "Email sent" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 })
  }
}


