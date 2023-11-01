"use client"

import { useState } from 'react'
import dayjs from 'dayjs'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordUpdate } from '@/app/_hooks/shared/useCollectionRecordUpdate'

export default function WorkAlbumUpdateModal(props) {
  const { workAlbum, packages, setState } = props
  const { id: recordId, thumbnail_path: thumbnailSrc, event_name: eventName } = workAlbum
  const { event_place: eventPlace, event_date: eventDate, client_name: clientName, package_type: packageType } = workAlbum
  const packageTypes = Array.from(new Set(packages?.map((pkg) => pkg.title)))
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnailSrc)
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'work_albums' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: {
      eventNameInput: eventName,
      eventPlaceInput: eventPlace,
      eventDateInput: dayjs(eventDate).format("YYYY-MM-DD"),
      clientNameInput: clientName,
      packageTypeInput: packageType
    }
  })

  function onImageChange() { setThumbnailUrl(URL.createObjectURL(getValues("thumbnailInput")[0])) }

  async function onSubmit(data) {

    const thumbnailFile = data.thumbnailInput[0]
    const imageFiles = data.imagesInput
    const eventName = data.eventNameInput
    const eventPlace = data.eventPlaceInput
    const clientName = data.clientNameInput
    const eventDate = data.eventDateInput
    const packageType = data.packageTypeInput

    const formData = new FormData()
    if (thumbnailFile) { formData.append('thumbnail_file', thumbnailFile) }
    if (eventName) { formData.append('event_name', eventName) }
    if (eventPlace) { formData.append('event_place', eventPlace) }
    if (eventDate) { formData.append('event_date', eventDate) }
    if (clientName) { formData.append('client_name', clientName) }
    if (packageType) { formData.append('package_type', packageType) }
    if (Array.from(imageFiles).length >= 1) {
      Array.from(imageFiles).forEach((imageFile) => {
        formData.append('image_files', imageFile)
      })
    }

    await collectionRecordUpdate({ recordId: recordId, formData: formData })
    setValue('eventNameInput', eventName)
    setValue('eventPlaceInput', eventPlace)
    setValue('eventDateInput', eventDate)
    setValue('clientNameInput', clientName)
    setValue('packageTypeInput', packageType)
    setState(performance.now())
    document.getElementById(`WorkAlbumUpdateModal-${recordId}`).close()
  }

  return (
    <>
      <dialog id={`WorkAlbumUpdateModal-${recordId}`} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Update work album</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={thumbnailUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />

            <div className="divider">
              <small className='font-bold text-primary'>Choose thumbnail to upload</small>
            </div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("thumbnailInput", { onChange: onImageChange })}
                required
              />
            </div>

            <div className="divider">
              <small>Choose photos to upload</small>
            </div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-sm file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imagesInput")}
                multiple
                required
              />
            </div>

            <div className="divider">
              <small>Other required fields</small>
            </div>
            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter event name"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventNameInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter event place"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventPlaceInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="date"
                placeholder={"Enter event date"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventDateInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 w-full max-w-xs">
              <select
                className="select select-bordered w-full max-w-xs"
                {...register("packageTypeInput")}
                required
              >
                {packageTypes.map((packageType, index) => (
                  <option
                    key={`PackageType-${index}`}
                    value={packageType}
                  >
                    {packageType}
                  </option>
                ))}
              </select>
            </div>

            <div className="divider">
              <small>Optional</small>
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter client to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("clientNameInput")}
                required
              />
            </div>


          </div>
          <div className="modal-action flex">
            <form>
              <button onClick={handleSubmit(onSubmit)} className="btn btn-primary" disabled={isLoading}>Save</button>
            </form>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
