import Image from 'next/image'

// App imports
import { useCollectionRecordDelete } from '@/app/_hooks/shared/useCollectionRecordDelete'
import useDeletePackage from '@/app/_hooks/index/useDeletePackage'
import revalidateAllData from '@/app/_services/shared/revalidateAllData'

export default function PackageCardDeleteModal(props) {
  const { packageCard, modalId, setState } = props
  const { id: cardId, title: cardTitle, image_path: cardImgSrc } = packageCard
  const { deletePackage, isLoading } = useDeletePackage()

  function closeModal(){
    document.getElementById(modalId).close()
  }
  
  async function onSubmit(data) {
    await deletePackage({recordId: cardId})
      .then(async ({data, error}) => {
        if (error) {

        } else {
          await revalidateAllData()
          closeModal()
        }
      })
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mt-4">Delete package</h3>
          <div className="my-4">
            <Image
              width={300}
              height={300}
              src={cardImgSrc}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
            <div className="prose max-w-none text-center my-6">
              <h3 className=''>{cardTitle}</h3>
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
