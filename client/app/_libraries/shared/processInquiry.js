import getImagePublicUrl from "./getImagePublicUrl"

export default function processInquiry(inquiry){
  const imagePaths = []

  inquiry.preferred_design_samples.forEach((imageFileName) => {
    const imagePublicUrl = getImagePublicUrl({
      collectionName: 'inquiries',
      recordId: inquiry.id,
      fileName: imageFileName
    })

    imagePaths.push(imagePublicUrl)
  })

  inquiry.preferred_design_samples_image_paths = imagePaths
  return inquiry
}