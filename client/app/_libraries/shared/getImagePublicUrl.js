export default function getImagePublicUrl({ collectionName, recordId, fileName }) {
  const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
  const imagePath = `${baseUrl}/${collectionName}/${recordId}/${fileName}`
  return imagePath
}