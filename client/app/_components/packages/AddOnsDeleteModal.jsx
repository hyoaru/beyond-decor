// App imports
import { useCollectionRecordDelete } from '@/app/_hooks/shared/useCollectionRecordDelete'

export default function AddOnsDeleteModal(props) {
  const { addOnCard, modalId, setState } = props
  const { id: cardId, title, category, price } = addOnCard
  const { collectionRecordDelete, isLoading, error } = useCollectionRecordDelete({ collectionName: "addons" })

  async function onSubmit(data) {
    await collectionRecordDelete({ recordId: cardId })
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Delete add-on</h3>
          <div className="my-4">
            <div className="prose max-w-none text-center my-6">
              <h2 className='m-0'>{title}</h2>
              <small className='opacity-80'>{category} - {price === 0 ? "-" : price}</small>
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
