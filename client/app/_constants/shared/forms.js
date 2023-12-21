import * as z from "zod"
import processInclusions from "@libraries/shared/processInclusions"

export const MAX_FILE_SIZE_IN_MB = 10 * 1000000

export const PACKAGES_BASE_FORM_SCHEMA = {
  title: z.string().min(5).max(70),
  description: z.string().min(10).max(800),
  shortDescription: z.string().min(10).max(400),
  price: z.coerce.number(),
  inclusions: z.string()
    .refine((value) => {
      try {
        JSON.parse(value.length <= 0 ? value : JSON.stringify(processInclusions(value)))
      } catch (error) {
        return false
      }
      return true
    }, `Invalid inclusions`),
  imageFile: z.any()
    .refine((files) => files?.length !== 0, `Thumbnail is required`)
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE_IN_MB, `Max image size is 10MB.`),
}

export const WORK_ALBUMS_BASE_FORM_SCHEMA = {
  eventName: z.string().min(5).max(70),
  eventPlace: z.string().min(5).max(70),
  eventDate: z.coerce.date(),
  clientName: z.string().optional(),
  packageType: z.string().refine((value) => value?.length !== 0, `Package type is required`),
  thumbnailFile: z.any()
    .refine((files) => files?.length !== 0, `Thumbnail is required`)
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE_IN_MB, `Max image size is 10MB.`),
  imageFiles: z.any()
    .refine((files) => files?.length !== 0, `Thumbnail is required`)
    .refine((files) => Array.from(files)?.length <= 12, `You can only select up to 12 images`)
    .refine((files) => Array.from(files)?.every((file) => file?.size <= MAX_FILE_SIZE_IN_MB), `Max image size is 10MB`),
}

export const ADDONS_BASE_FORM_SCHEMA = {
  title: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number()
}

// DERIVED FORM SCHEMAS
export const UPDATE_PACKAGE_FORM_SCHEMA = z.object({
  title: PACKAGES_BASE_FORM_SCHEMA.title,
  description: PACKAGES_BASE_FORM_SCHEMA.description,
  shortDescription: PACKAGES_BASE_FORM_SCHEMA.shortDescription,
  price: PACKAGES_BASE_FORM_SCHEMA.price,
  inclusions: PACKAGES_BASE_FORM_SCHEMA.inclusions,
  imageFile: z.any()
    .refine((files) => {
      if (files.length === 0) { return true }
      return files[0]?.size <= MAX_FILE_SIZE_IN_MB
    }, `Max image size is 5MB.`),
})

export const ADD_PACKAGE_FORM_SCHEMA = z.object({
  title: PACKAGES_BASE_FORM_SCHEMA.title,
  description: PACKAGES_BASE_FORM_SCHEMA.description,
  shortDescription: PACKAGES_BASE_FORM_SCHEMA.shortDescription,
  price: PACKAGES_BASE_FORM_SCHEMA.price,
  inclusions: PACKAGES_BASE_FORM_SCHEMA.inclusions,
  imageFile: PACKAGES_BASE_FORM_SCHEMA.imageFile,
})  