"use client";

import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

// App imports
import AnimationSlideOnShow from '../../_animations/index/AnimationSlideOnShow';

export default function EventServingGroup(props) {
  const { imgSrc, title, description, isRightAligned, isAdmin, modalIdToTrigger } = props

  function onEdit() { if (isAdmin) { document.getElementById(modalIdToTrigger).showModal() } }

  return (
    <>
      <AnimationSlideOnShow isRightAligned={isRightAligned}>
        <div className={"grid grid-cols-1 justify-items-center place-items-center gap-10 sm:grid-cols-2 " + (isRightAligned ? "sm:justify-items-end" : "sm:justify-items-start")}>
          <div className={'prose max-w-none text-center order-2 px-8 sm:px-0 sm:w-10/12 sm:text-left ' + (isRightAligned ? "sm:text-right sm:order-1" : "sm:text-left")}>
            <div>
              {isAdmin && <FontAwesomeIcon icon={faPencil} size='sm' className='text-primary cursor-pointer' onClick={onEdit} />}
              <h2 className='mt-3 mb-0'>{title}</h2>
            </div>
            <p className='mt-3 sm:text-sm lg:text-base'>{description}</p>
          </div>
          <div className={'order-1 shadow-xl ' + (isRightAligned ? "sm:order-2" : "")}>
            <Image
              height={300}
              width={800}
              src={imgSrc}
              className={'h-[300px] w-[1000px] object-cover rounded-none shadow-xl ' + (isRightAligned ? "sm:rounded-tl-xl" : "sm:rounded-tr-xl")}
              alt=""
            />
          </div>
        </div>
      </AnimationSlideOnShow>
    </>
  )
}
