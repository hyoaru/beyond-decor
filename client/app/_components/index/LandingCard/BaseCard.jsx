import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

// App imports
import AnimationOnHover from "../../../_animations/shared/AnimationOnHover"

export default function BaseCard(props) {
  const { imgWidth, imgHeight, imgSrc, imgOnLoad, quotation, modalIdToTrigger, isAdmin, onClick } = props;

  return (
    <>
      <div className={"relative " + props.additionalClasses} onClick={onClick}>
        <div className="prose absolute flex items-center justify-center w-full h-full p-10">
          <h4 className="text-center font-bold">{quotation}</h4>
          {(isAdmin && quotation) && <>
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
          <div className={"relative " + (isAdmin ? ' cursor-pointer' : '')}>
            <div className="absolute w-full h-full rounded-xl rounded-tr-none rounded-bl-none"></div>
            <Image
              width={imgWidth}
              height={imgHeight}
              src={imgSrc}
              onLoad={imgOnLoad}
              style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
              alt="" className={'rounded-xl object-cover rounded-tr-none rounded-bl-none shadow-lg'}
            />
          </div>
        </AnimationOnHover>
      </div>

    </>
  )
}
