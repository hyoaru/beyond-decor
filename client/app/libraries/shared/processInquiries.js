export default function processInquiries({ collectionName, inquiries }) {

  inquiries.map((inquiry) => {
    const recordId = inquiry.id
    const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
    const imagePaths = []
    inquiry.preferred_design_samples.forEach((preferred_design_sample) => {
      const imageFile = preferred_design_sample
      const imagePath = `${baseUrl}/${collectionName}/${recordId}/${imageFile}`
      imagePaths.push(imagePath)
    }) 
    
    inquiry.preferred_design_samples_image_paths = imagePaths
    return inquiry
  })
  
  return inquiries
}
