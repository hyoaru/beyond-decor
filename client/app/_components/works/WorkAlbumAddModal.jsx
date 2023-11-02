"use client"

import { useState } from 'react'
import Image from 'next/image'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordCreate } from '../../_hooks/shared/useCollectionRecordCreate'
import { resizeImage } from '@/app/_libraries/shared/resizeImage'

export default function WorkAlbumAddModal(props) {
  const { packages, setState } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordCreate, isLoading, error } = useCollectionRecordCreate({ collectionName: 'work_albums' })
  const [thumbnailUrl, setThumbnailUrl] = useState()
  const packageTypes = Array.from(new Set(packages?.map((pkg) => pkg.title)))

  function onThumbnailImageChange() {
    setThumbnailUrl(URL.createObjectURL(getValues("thumbnailInput")[0]))
  }

  function onAlbumImagesChange() {
    const albumImagesCount = Array.from(getValues("imagesInput")).length
    if (albumImagesCount > 12) {
      alert("You can only upload up to 12 images!")
      resetField("imagesInput")
    }
  }

  async function onSubmit(data) {
    try {
      const thumbnailFile = await resizeImage(data.thumbnailInput[0])
      const imageFiles = data.imagesInput
      const eventName = data.eventNameInput
      const eventPlace = data.eventPlaceInput
      const clientName = data.clientNameInput
      const eventDate = data.eventDateInput
      const packageType = data.packageTypeInput

      if (thumbnailFile && imageFiles.length > 0 && eventName && eventPlace && eventDate) {
        const formData = new FormData()
        formData.append('thumbnail_file', thumbnailFile)
        formData.append('event_name', eventName)
        formData.append('event_place', eventPlace)
        formData.append('event_date', eventDate)
        formData.append('package_type', packageType)
        if (clientName) { formData.append('client_name', clientName) }
        
        for await (const imageFile of imageFiles) {
          const resizedImageFile = await resizeImage(imageFile)
          formData.append('image_files', resizedImageFile)
        }

        await collectionRecordCreate({ formData: formData })
        setState(performance.now())
        document.getElementById('WorkAlbumAddModal').close()

      } else {
        alert('Fill up all fields to proceed.')
      }

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <dialog id={'WorkAlbumAddModal'} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Add work album</h3>
          <div className="my-4">
            {thumbnailUrl && <>
              <Image
                width={300}
                height={300}
                src={thumbnailUrl}
                style={{ width: `${300}px`, height: `${300}px` }}
                alt="" className={'rounded-xl object-cover flex mx-auto'}
              />
            </>}

            <div className="divider">
              <small className='font-bold text-primary'>Choose thumbnail to upload</small>
            </div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("thumbnailInput", { onChange: onThumbnailImageChange })}
                required
              />
            </div>

            <div className="divider">
              <small>Upload <span className='font-bold'>up to 12 images</span> to display</small>
            </div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-sm file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imagesInput", { onChange: onAlbumImagesChange })}
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
                placeholder={"Enter client name"}
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
