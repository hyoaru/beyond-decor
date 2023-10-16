"use client";

import Image from "next/image"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// App imports
import AnimationOnHover from "../../animations/AnimationOnHover"
import { useAuthStateContext } from "@/app/context";
import { useEffect } from "react";

export default function Card(props) {
  const authState = useAuthStateContext()

  function handleClick() {
    if (authState.isAdmin) { document.getElementById(`${props.modalID}`).showModal() }
  }

  return (
    <>
      <div className={"relative " + props.additionalClasses} onClick={handleClick}>
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{props.quotation}</h4>
          {(authState.isAdmin && props.quotation) && <>
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
          <div className={"relative " + (authState.isAdmin ? ' cursor-pointer' : '')}>
            <div className="absolute w-full h-full rounded-xl rounded-tr-none rounded-bl-none"></div>
            <img
              width={props.width}
              height={props.height}
              src={`${props.src}`}
              onLoad={props.onLoad}
              style={{ width: `${props.width}px`, height: `${props.height}px` }}
              alt="" className={'rounded-xl object-cover rounded-tr-none rounded-bl-none shadow-lg'}
            />
          </div>
        </AnimationOnHover>
      </div>

    </>
  )
}
