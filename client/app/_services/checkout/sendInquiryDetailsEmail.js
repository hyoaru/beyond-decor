"use server"

import { render } from "@react-email/render";
import { InquiryDetailsEmail } from "@components/checkout/email/InquiryDetailsEmail";

var nodemailer = require("nodemailer")
export async function sendInquiryDetailsEmail({ to, from, subject, inquiry }) {
  const response = {data: null, error: null}

  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_SMTP_HOST,
    port: process.env.NEXT_PUBLIC_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_AUTH_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_AUTH_PASSWORD,
    },
  })

  try {
    response.data = await transporter.sendMail({
      to: to, from: from, subject: subject,
      html: render(<InquiryDetailsEmail inquiry={inquiry} />)
    })
  } catch (error) {
    response.error = error
  }

  return response
}

