import * as z from "zod"

export const MAX_FILE_SIZE_IN_MB = 10 * 1000000

export const PACKAGES_BASE_FORM_SCHEMA = {
  title: z.string().min(5).max(70),
  description: z.string().min(10).max(800),
  shortDescription: z.string().min(10).max(400),
  price: z.coerce.number(),
  inclusions: z.string().refine((value) => JSON.parse(value).then((_) => true).catch((_) => false), `Invalid JSON`),
  imageFile: z.any()
    .refine((files) => files?.length !== 0, `Thumbnail is required`)
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE_IN_MB, `Max image size is 5MB.`),
}