// App imports
import { useCollectionRecordDelete } from '@/app/hooks/shared/useCollectionRecordDelete'

export default function PackageCardDeleteModal(props) {
  const { cardId, cardTitle, cardDescription, cardImgSrc, modalId, setState } = props
  const { collectionRecordDelete, isLoading, error } = useCollectionRecordDelete({ collectionName: "package_cards" })

  async function onSubmit(data) {
    await collectionRecordDelete({ recordId: cardId })
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Delete package card</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={cardImgSrc}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
            <div className="prose max-w-none text-center my-6">
              <h2>{cardTitle}</h2>
            </div>
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
