import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default function PackageCard(props) {
  const { imgSrc, title, description, isAdmin, editModalIdToTrigger, deleteModalIdToTrigger, recordId, setState } = props

  function onEdit() {
    if (isAdmin) { document.getElementById(editModalIdToTrigger).showModal() }
  }

  function onDelete() {
    if (isAdmin) { document.getElementById(deleteModalIdToTrigger).showModal() }
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
              <ul tabIndex={0} className="dropdown-content text-xs font-semibold z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-primary">
                <li><a onClick={onEdit}>Edit</a></li>
                <li><a onClick={onDelete}>Delete</a></li>
              </ul>
            </div>
          </div>
        </>}

        <div className={"card w-64 bg-base-100 shadow-lg"}>
          <figure className='mt-0 mb-0'>
            <Image
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
