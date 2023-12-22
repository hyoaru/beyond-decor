import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"

export default function TeamMember(props) {
  const { teamMember, isAdmin, editModalIdToTrigger, deleteModalIdToTrigger } = props
  const { id: memberId, name, role, image_path: imgSrc } = teamMember

  const imgSizeInPx = 200

  function onEdit() {
    document.getElementById(editModalIdToTrigger).showModal()
  }
  
  function onDelete() {
    document.getElementById(deleteModalIdToTrigger).showModal()
  }

  return (
    <>
      <div className={`rounded-box border px-8 pb-6 w-[300px] flex flex-col items-center ${isAdmin ? "pt-4" : "pt-8"}`}>
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

        <Image
          src={imgSrc}
          height={imgSizeInPx}
          width={imgSizeInPx}
          alt=""
          style={{ width: `${imgSizeInPx}px`, height: `${imgSizeInPx}px` }}
          className={`rounded-box w-[300px] object-cover`}
        />

        <div className="prose max-w-none mt-5 text-center">
          <h3 className='mb-0 text-primary'>{name}</h3>
          <p className='mt-1 mb-0 text-sm leading-snug'>{role}</p>
        </div>
      </div>
    </>
  )
}
