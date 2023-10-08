"use client";

import Image from "next/image"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// App imports
import AnimationOnHover from "../../animations/AnimationOnHover"
import { useUserStateContext } from "@/app/context";

export default function Card(props) {
  const user = useUserStateContext()

  return (
    <>
      <div className={"relative " + props.additionalClasses}>
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{props.quotation}</h4>
          {user && <>
            <FontAwesomeIcon 
              icon={faPencil} 
              className="absolute top-1/3 text-primary" 
            />
          </>}
        </div>

        <AnimationOnHover
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.10 }}
        >
          <Image
            width={props.width}
            height={props.height}
            src={props.src}
            onLoad={props.onLoad}
            style={{ width: `${props.width}px`, height: `${props.height}px` }}
            alt="" className={user ? 'rounded-xl object-cover cursor-pointer' : 'rounded-xl object-cover cursor-pointer'}
            onClick={() => {document.getElementById(`${props.modalID}`).showModal()}}
          />
        </AnimationOnHover>
      </div>

    </>
  )
}
