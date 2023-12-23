import Image from 'next/image';

// App imports
import AnimationSlideOnShow from '@animations/index/AnimationSlideOnShow';

export default function EventServingGroup(props) {
  const { eventServingGroup, isRightAligned } = props
  const { image_path: imgSrc, title, description } = eventServingGroup

  return (
    <>
      <AnimationSlideOnShow isRightAligned={isRightAligned}>
        <div className={`grid grid-cols-1 justify-items-center place-items-center gap-10 sm:grid-cols-2 ${isRightAligned ? "sm:justify-items-end" : "sm:justify-items-start"}`}>
          <div className={`prose max-w-none text-center order-2 px-8 sm:px-0 sm:w-10/12 ${isRightAligned ? "sm:text-right sm:order-1" : "sm:text-left"}`}>
            <h2 className='mt-3 mb-0'>{title}</h2>
            <p className='mt-3 sm:text-sm lg:text-base'>{description}</p>
          </div>

          <div className={`order-1 shadow-xl ${isRightAligned ? "sm:order-2" : ""}`}>
            <Image
              height={300} width={800}
              src={imgSrc} alt=""
              priority={true}
              className={`h-[300px] w-[1000px] object-cover rounded-none shadow-xl ${isRightAligned ? "sm:rounded-tl-xl" : "sm:rounded-tr-xl"}`}
            />
          </div>
        </div>
      </AnimationSlideOnShow>
    </>
  )
}
