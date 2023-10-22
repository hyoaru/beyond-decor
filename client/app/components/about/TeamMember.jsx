import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function TeamMember(props) {
  const { memberId, name, role, imgSrc, isAdmin, editModalIdToTrigger, deleteModalIdToTrigger } = props
  const baseClass = "rounded-xl rounded-tr-none rounded-bl-none"
  const imgSizeInPx = 200

  function onEdit() { document.getElementById(editModalIdToTrigger).showModal() }
  function onDelete() { document.getElementById(deleteModalIdToTrigger).showModal() }

  return (
    <>
      <div className={`${baseClass} border px-10 pb-7 w-[400x] flex flex-col items-center ${isAdmin ? "pt-4" : "pt-10"}`}>
        {isAdmin && <>
          <div className="dropdown flex dropdown-bottom dropdown-end self-end opacity-90">
            <label tabIndex={0} className='ms-auto'>
              <FontAwesomeIcon
                icon={faEllipsis}
                size='lg'
                className='text-primary mb-2 cursor-pointer'
              />
            </label>
            <ul tabIndex={0} className="dropdown-content text-xs font-semibold z-[1] menu p-2 bg-base-100 rounded-box w-52 border border-primary">
              <li><a onClick={onEdit}>Edit</a></li>
              <li><a onClick={onDelete}>Delete</a></li>
            </ul>
          </div>
        </>}

        <img
          src={imgSrc}
          height={imgSizeInPx}
          width={imgSizeInPx}
          style={{ width: `${imgSizeInPx}px`, height: `${imgSizeInPx}px` }}
          className={`${baseClass} object-cover`}
        />

        <div className="prose max-w-none mt-5 text-center">
          <h3 className='mb-0'>{name}</h3>
          <p className='mt-0 mb-0'>{role}</p>
        </div>
      </div>
    </>
  )
}
