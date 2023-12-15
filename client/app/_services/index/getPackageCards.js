import getClient from "@services/pocketbase/getClient";
import getImagePublicUrl from "@libraries/shared/getImagePublicUrl";

export default async function getPackageCards() {
  const COLLECTION_NAME = 'packages'

  const pocketbase = getClient()
  const packages = await pocketbase
    .collection(COLLECTION_NAME)
    .getFullList({ sort: 'price' })
    .then((packages) => {
      packages?.map((_package) => {
        _package.image_path = getImagePublicUrl({
          collectionName: COLLECTION_NAME,
          recordId: _package.id,
          fileName: _package.image_file
        })
      })

      return packages
    })

  return packages
}
