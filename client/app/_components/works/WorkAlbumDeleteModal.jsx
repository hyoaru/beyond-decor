import Image from 'next/image'

// App imports
import { useCollectionRecordDelete } from '@/app/_hooks/shared/useCollectionRecordDelete'
import { useRouter } from 'next/navigation'

export default function WorkAlbumDeleteModal(props) {
  const { recordId, thumbnailSrc, eventName } = props
  const { collectionRecordDelete, isLoading, error } = useCollectionRecordDelete({ collectionName: 'work_albums' })
  const router = useRouter()

  async function onSubmit() {
    await collectionRecordDelete({ recordId: recordId })
    document.getElementById(`WorkAlbumDeleteModal-${recordId}`).close()
    router.push(`/works/`)
  }

  return (
    <>
      <dialog id={`WorkAlbumDeleteModal-${recordId}`} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Delete work album</h3>
          <div className="my-4">
            <Image
              width={300}
              height={300}
              src={thumbnailSrc}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
          </div>
          <div className="prose max-w-none text-center my-6">
            <h2>{eventName}</h2>
          </div>

          <div className="modal-action flex">
            <form>
              <button onClick={onSubmit} className="btn btn-error" disabled={isLoading}>Delete</button>
            </form>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
