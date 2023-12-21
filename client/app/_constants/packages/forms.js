import * as z from "zod"
import { ADDONS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const ADD_ADDONS_BASE_FORM_SCHEMA = z.object({
  title: ADDONS_BASE_FORM_SCHEMA.title,
  category: ADDONS_BASE_FORM_SCHEMA.category,
  price: ADDONS_BASE_FORM_SCHEMA.price,
})

export const UPDATE_ADDONS_BASE_FORM_SCHEMA = z.object({
  title: ADDONS_BASE_FORM_SCHEMA.title,
  category: ADDONS_BASE_FORM_SCHEMA.category,
  price: ADDONS_BASE_FORM_SCHEMA.price,
})