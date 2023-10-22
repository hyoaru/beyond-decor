"use client"

import AnimationOnHover from "@/app/animations/shared/AnimationOnHover"
import { useRouter } from "next/navigation"

export default function WorkAlbum(props) {
  const { albumId, imgSrc, eventName, eventPlace, eventDate, isAdmin } = props
  const router = useRouter()
  const baseClass = "rounded-xl rounded-tr-none rounded-bl-none"
  const imgSizeInPx = 500

  function onClick() {
    router.push(`/works/${albumId}`)
  }

  return (
    <>
      <div className={`${baseClass} relative cursor-pointer shadow-xl`} onClick={onClick}>
        <div className={`absolute flex w-full h-full`}>
          <div className={`${baseClass} prose relative text-center my-auto mx-auto flex flex-col w-[90%] h-[90%] p-10 border border-primary`}>
            <small className=" uppercase font-bold text-primary">{eventDate}</small>
            <h2 className="mt-auto">{eventName}</h2>
            <small className="uppercase">{eventPlace}</small>
            <h4 className="mt-auto uppercase text-primary">
              <span className="border-b border-primary p-1 z-40 cursor-pointer">Show me more</span>
            </h4>
          </div>
        </div>

        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <img
            className={`${baseClass} object-cover`}
            style={{width: `${imgSizeInPx}px`, height: `${imgSizeInPx}px`}}
            height={imgSizeInPx}
            width={imgSizeInPx}
            src={imgSrc}
          />
        </AnimationOnHover>
      </div>
    </>
  )
}
