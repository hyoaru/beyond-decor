import Image from "next/image"
import Link from "next/link"

export default function WorkAlbum(props) {
  const { albumId, imgSrc, eventName, eventPlace, eventDate } = props
  const imgSizeInPx = 500

  return (
    <>
      <div className={`group/work-album rounded-box relative shadow-xl`}>
        <div className={`absolute flex w-full h-full opacity-0 group-hover/work-album:opacity-100 transition-all ease-in-out duration-500`}>
          <div className={`rounded-box prose relative text-center my-auto mx-auto flex flex-col w-[90%] h-[90%] p-10 border border-primary`}>
            <small className=" uppercase font-bold text-primary">{eventDate}</small>
            <h2 className="mt-auto">{eventName}</h2>
            <small className="uppercase">{eventPlace}</small>
            <h4 className="mt-auto uppercase text-primary">
              <Link href={`/works/${albumId}`} className="underline-offset-8 text-primary ">Show me more</Link>
            </h4>
          </div>
        </div>

        <Image
          className={`rounded-box object-cover transition-all ease-in-out duration-500 group-hover/work-album:opacity-20 pointer-events-none`}
          style={{ width: `${imgSizeInPx}px`, height: `${imgSizeInPx}px` }}
          height={imgSizeInPx}
          width={imgSizeInPx}
          src={imgSrc}
          alt=""
        />

      </div>
    </>
  )
}
