import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// App imports
import { useCollectionRecordDelete } from '@/app/hooks/shared/useCollectionRecordDelete'

export default function PackageCard(props) {
  const { imgSrc, title, description, isAdmin, modalIdToTrigger, recordId, setState } = props
  const { collectionRecordDelete, isLoading, error } = useCollectionRecordDelete({ collectionName: 'package_cards' })

  function onEdit() {
    if (isAdmin) { document.getElementById(modalIdToTrigger).showModal() }
  }
  async function onDelete() {
    if (isAdmin) {
      await collectionRecordDelete({ recordId: recordId })
      setState(performance.now())
      document.getElementById(modalIdToTrigger).close()
    }
  }

  return (
    <>
      <div className="relative">
        {isAdmin && <>
          <div className="absolute z-50 w-full">
            <div className="dropdown flex dropdown-bottom dropdown-end opacity-80">
              <label tabIndex={0} className='ms-auto p-2 me-2 mt-1'>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  size='xl'
                  className='shadow-xl text-white'
                />
              </label>
              <ul tabIndex={0} className="dropdown-content text-xs font-semibold z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={onEdit}>Edit</a></li>
                <li><a onClick={onDelete}>Delete</a></li>
              </ul>
            </div>
          </div>
        </>}

        <div className={"card w-64 bg-base-100 shadow-lg"}>
          <figure className='mt-0 mb-0'>
            <img
              src={`${imgSrc}`}
              style={{ width: "300px", height: "200px" }}
              width={300} height={200}
              className='object-cover' alt=""
            />
          </figure>
          <div className="card-body p-6 py-8">
            <h2 className="card-title mt-0 mb-0 text-md">{title}</h2>
            <p className='mt-0 text-sm'>{description}</p>
          </div>
        </div>

      </div>
    </>
  )
}
