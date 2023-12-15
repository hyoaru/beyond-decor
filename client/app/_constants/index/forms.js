import * as z from "zod"

// App imports
import { PACKAGES_BASE_FORM_SCHEMA, MAX_FILE_SIZE_IN_MB } from "@constants/shared/forms"

export const UPDATE_PACKAGE_FORM_SCHEMA = z.object({
  title: PACKAGES_BASE_FORM_SCHEMA.title,
  shortDescription: PACKAGES_BASE_FORM_SCHEMA.shortDescription,
  imageFile: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 5MB.`),
})