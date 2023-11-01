import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk } from '@fortawesome/free-solid-svg-icons'

export default function RequiredFieldLayout({ children }) {
  return (
    <>
      <div className="indicator w-full">
        <FontAwesomeIcon icon={faAsterisk} size='sm' className='indicator-item text-error' />
        {children}
      </div>
    </>
  )
}
