"use client"

import { useState } from 'react'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordUpdate } from '@/app/hooks/shared/useCollectionRecordUpdate'

export default function WorkAlbumUpdateModal(props) {
  const { setState, recordId, thumbnailSrc } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'work_albums' })
  const [thumbnailUrl, setThumbnailUrl] = useState(thumbnailSrc)

  function onImageChange() { setThumbnailUrl(URL.createObjectURL(getValues("thumbnailInput")[0])) }

  async function onSubmit(data) {
    const thumbnailFile = data.thumbnailInput[0]
    const imageFiles = data.imagesInput
    const eventName = data.eventNameInput
    const eventPlace = data.eventPlaceInput
    const clientName = data.clientNameInput
    const eventDate = data.eventDateInput

    const formData = new FormData()
    if (thumbnailFile) { formData.append('thumbnail_file', thumbnailFile) }
    if (eventName) { formData.append('event_name', eventName) }
    if (eventPlace) { formData.append('event_place', eventPlace) }
    if (eventDate) { formData.append('event_date', eventDate) }
    if (clientName) { formData.append('client_name', clientName) }
    if (Array.from(imageFiles).length >= 1) {
      Array.from(imageFiles).forEach((imageFile) => {
        formData.append('image_files', imageFile)
      })
    }

    await collectionRecordUpdate({ recordId: recordId, formData: formData })
    setState(performance.now())
    document.getElementById(`WorkAlbumUpdateModal-${recordId}`).close()
    reset()
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
                placeholder={"Enter event name to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventNameInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter event place to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventPlaceInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <input
                type="date"
                placeholder={"Enter event place to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("eventDateInput")}
                required
              />
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
              <button onClick={handleSubmit(onSubmit)} className="btn btn-neutral" disabled={isLoading}>Save</button>
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
