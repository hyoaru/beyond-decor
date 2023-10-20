export default function processWorkAlbums({ collectionName, albums }) {

  albums.map((album) => {
    const recordId = album.id
    const thumbnailFile = album.thumbnail_file
    const baseUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files`
    const thumbnailPath = `${baseUrl}/${collectionName}/${recordId}/${thumbnailFile}`
    album.thumbnail_path = thumbnailPath
    album.is_local = false

    const imagePaths = []
    album.image_files.forEach((image_file) => {
      const imageFile = image_file
      const imagePath = `${baseUrl}/${collectionName}/${recordId}/${imageFile}`
      imagePaths.push(imagePath)
    }) 
    
    album.image_paths = imagePaths
    return album
  })
  
  return albums
}
