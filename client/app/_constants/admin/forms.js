import * as z from "zod"
import { ADMINS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const LOGIN_ADMIN_BASE_FORM_SCHEMA = z.object({
  email: ADMINS_BASE_FORM_SCHEMA.email,
  password: ADMINS_BASE_FORM_SCHEMA.password,
})