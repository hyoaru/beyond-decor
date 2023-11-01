import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

export default function BagItemAddOn(props) {
  const { addOn, removeAddOn } = props
  const {title, price} = addOn

  function onRemove() {
    removeAddOn(addOn)
  }

  return (
    <div className="grid grid-cols-12 items-center p-3 px-7 rounded-box border">
      <div className="col-span-8 md:col-span-9">
        <p className="text-lg">{title}</p>
      </div>
      <div className="col-span-3 md:col-span-2">
        <small className="mx-auto ">₱ {price.toLocaleString()}</small>
      </div>
      <div className="col-span-1 text-right">
        <FontAwesomeIcon icon={faX} className="text-error cursor-pointer" onClick={onRemove}/>
      </div>
    </div>
  )
}
