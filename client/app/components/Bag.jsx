import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Bag(props) {
  const { mainPackage, addOns, totalCount, removeAddOn, removeMainPackage } = props
  return (
    <>
      <div className="card-body">
        <h3 className="uppercase text-center text-lg font-bold opacity-80">Your bag</h3>
        <div className="border border-dashed mb-2"></div>
        <div className="mx-2">
          {mainPackage && <>
            <div className="flex items-center">
              <p className="font-bold text-lg me-auto text-primary">{mainPackage.title}</p>
              <FontAwesomeIcon
                icon={faX}
                size="lg"
                className="text-error cursor-pointer"
                onClick={removeMainPackage}
              />
            </div>
          </>}

          {addOns && addOns.map((addOn) => (
            <div key={`AddOnsBagItem-${addOn.id}`} className="flex items-center">
              <p className="text-lg me-auto">{addOn.title}</p>
              <FontAwesomeIcon
                icon={faX}
                size="lg"
                className="text-error cursor-pointer"
                onClick={() => removeAddOn(addOn)}
              />
            </div>
          ))}

        </div>

        <div className="border border-dashed mb-2"></div>
        <p className="text-center text-primary">{totalCount()} items in bag</p>
      </div>
      <div className="card-actions mb-4 flex justify-center">
        <Link href={"/packages"} className="btn btn-primary btn-sm btn-outline">Add items</Link>
        <button className="btn btn-primary btn-sm">Get a quote</button>
      </div>
    </>
  )
}
