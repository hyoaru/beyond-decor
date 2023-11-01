import dayjs from 'dayjs'
import React from 'react'
import Image from 'next/image'

export default function InquiryDetailsModal(props) {
  const { inquiry, modalId } = props
  const { id: recordId, event_type: eventType, event_date: eventDate, event_place: eventPlace } = inquiry
  const { preferred_design_description: preferredDesignDescription, main_package: mainPackage, add_ons: addOns } = inquiry
  const { items_total_cost: itemsTotalCost, preferred_design_samples_image_paths: preferredDesignSamplesImagePaths } = inquiry
  const eventDateFormatted = dayjs(eventDate).format('MMMM DD, YYYY')
  const addOnsFormatted = `[${addOns?.map((addOn) => addOn.title).join(", ")}]` ?? '[]'

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Inquiry details</h3>
          <div className="my-4">
            <p><span className='text-primary font-bold'>Occasion: </span>{eventType}</p>
            <p><span className='text-primary font-bold'>When: </span>{eventDateFormatted}</p>
            <p><span className='text-primary font-bold'>Where: </span>{eventPlace}</p>
            <p><span className='text-primary font-bold'>Package: </span>{mainPackage?.title ?? 'None'}</p>
            <p><span className='text-primary font-bold'>Add-ons: </span>{addOnsFormatted}</p>
            <p><span className='text-primary font-bold'>Total cost: </span>{itemsTotalCost}</p>
            <p><span className='text-primary font-bold'>Preferred design description: </span>{preferredDesignDescription}</p>
            {preferredDesignSamplesImagePaths[0] && <>
              <div className="divider">
                <small className="font-bold">Preferred design samples</small>
              </div>
              <div className="columns">
                {preferredDesignSamplesImagePaths.map((image_path, index) => (
                  <Image
                    key={`PreferredDesignSample-${recordId}-${index}`}
                    src={image_path}
                    className='m-1 mx-auto'
                    alt=''
                    width={350}
                    height={350}
                  />
                ))}
              </div>
            </>}
          </div>
          <div className="modal-action flex">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
