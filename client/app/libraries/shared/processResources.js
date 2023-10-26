export default function processResources({ collectionName, resources }) {
  resources.map((resource) => {
    const recordId = resource.id
    const filename = resource.image_file
    const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
    const imagePath = `${baseUrl}/${collectionName}/${recordId}/${filename}`
    resource.image_path = imagePath
    resource.is_local = false
    return resource
  })

  return resources
}
