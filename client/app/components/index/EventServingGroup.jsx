"use client";

// App imports
import AnimationSlideOnShow from '../../animations/index/AnimationSlideOnShow';

export default function EventServingGroup(props) {
  const { imgSrc, title, description, isRightAligned } = props
  return (
    <>
      <AnimationSlideOnShow isRightAligned={isRightAligned}>
        <div className={"grid grid-cols-1 justify-items-center place-items-center gap-10 sm:grid-cols-2 " + (isRightAligned ? "sm:justify-items-end" : "sm:justify-items-start")}>
          <div className={'prose max-w-none text-center order-2 px-8 sm:px-0 sm:w-10/12 sm:text-left ' + (isRightAligned ? "sm:text-right sm:order-1" : "sm:text-left")}>
            <h2>{title}</h2>
            <p className='sm:text-sm lg:text-base'>{description}</p>
          </div>
          <div className={'order-1 ' + (isRightAligned ? "sm:order-2" : "")}>
            <img
              height={300}
              width={800}
              src={imgSrc}
              className={'h-[300px] w-[1000px] object-cover rounded-none ' + (isRightAligned ? "sm:rounded-tl-xl" : "sm:rounded-tr-xl")}
              alt=""
            />
          </div>
        </div>
      </AnimationSlideOnShow>
    </>
  )
}
