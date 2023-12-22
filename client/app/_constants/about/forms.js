import * as z from "zod"
import { TEAM_MEMBERS_BASE_FORM_SCHEMA } from "@constants/shared/forms"

export const ADD_TEAM_MEMBER_FORM_SCHEMA = z.object({
  name: TEAM_MEMBERS_BASE_FORM_SCHEMA.name,
  role: TEAM_MEMBERS_BASE_FORM_SCHEMA.role,
  imageFile: TEAM_MEMBERS_BASE_FORM_SCHEMA.imageFile,
})

export const UPDATE_TEAM_MEMBER_FORM_SCHEMA = z.object({
  name: TEAM_MEMBERS_BASE_FORM_SCHEMA.name,
  role: TEAM_MEMBERS_BASE_FORM_SCHEMA.role,
  imageFile: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 10MB.`),
})