import * as z from "zod"
import { WORK_ALBUMS_BASE_FORM_SCHEMA, MAX_FILE_SIZE_IN_MB } from "@constants/shared/forms"

export const UPDATE_WORK_ALBUM_FORM_SCHEMA = z.object({
  eventName: WORK_ALBUMS_BASE_FORM_SCHEMA.eventName,
  eventPlace: WORK_ALBUMS_BASE_FORM_SCHEMA.eventPlace,
  eventDate: WORK_ALBUMS_BASE_FORM_SCHEMA.eventDate,
  clientName: WORK_ALBUMS_BASE_FORM_SCHEMA.clientName,
  packageType: WORK_ALBUMS_BASE_FORM_SCHEMA.packageType,
  thumbnailFile: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 10MB.`),
  imageFiles: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return Array.from(files)?.length <= 12
    }, `You can only select up to 12 images`)
    .refine((files) => {
      if (files.length === 0) { return true }
      return Array.from(files)?.every((file) => file?.size <= MAX_FILE_SIZE_IN_MB)
    }, `Max image size is 10MB.`),
})
