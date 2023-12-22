import * as z from "zod"
import { INQUIRIES_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const ADD_INQUIRY_BASE_FORM_SCHEMA = z.object({
  fullName: INQUIRIES_BASE_FORM_SCHEMA.fullName,
  phoneNumber: INQUIRIES_BASE_FORM_SCHEMA.phoneNumber,
  emailAddress: INQUIRIES_BASE_FORM_SCHEMA.emailAddress,
  facebookLink: INQUIRIES_BASE_FORM_SCHEMA.facebookLink,
  eventType: INQUIRIES_BASE_FORM_SCHEMA.eventType,
  eventPlace: INQUIRIES_BASE_FORM_SCHEMA.eventPlace,
  eventDate: INQUIRIES_BASE_FORM_SCHEMA.eventDate,
  acquisitionSurvey: INQUIRIES_BASE_FORM_SCHEMA.acquisitionSurvey,
  preferredDesignDescription: INQUIRIES_BASE_FORM_SCHEMA.preferredDesignDescription,
  preferredDesignSamples: INQUIRIES_BASE_FORM_SCHEMA.preferredDesignSamples,
})
