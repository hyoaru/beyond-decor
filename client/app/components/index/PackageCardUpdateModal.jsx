"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// App imports
import { useCollectionRecordUpdate } from '../../hooks/shared/useCollectionRecordUpdate'

export default function PackageCardUpdateModal(props) {
  const { packageCard, modalId, setState } = props
  const { id: cardId, image_path: cardImgSrc, title, description, short_description: shortDescription, inclusions } = packageCard
  const [imageUrl, setImageUrl] = useState(cardImgSrc)
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'packages' })
  const { register, handleSubmit, reset, resetField, getValues, setValue } = useForm({
    defaultValues: {
      titleInput: title,
      descriptionInput: description,
      shortDescriptionInput: shortDescription,
      inclusionsInput: inclusions.join()
    }
  })

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    const imageFile = data.imageInput[0]
    const title = data.titleInput
    const description = data.descriptionInput
    const shortDescription = data.shortDescriptionInput
    const inclusions = JSON.stringify(data.inclusionsInput.split(","))

    const formData = new FormData()
    if (imageFile) { formData.append('image_file', imageFile) }
    if (title) { formData.append('title', title) }
    if (description) { formData.append('description', description) }
    if (shortDescription) { formData.append('short_description', shortDescription) }
    if (inclusions) { formData.append('inclusions', inclusions) }

    await collectionRecordUpdate({ recordId: cardId, formData: formData })

    resetField("titleInput")
    resetField("descriptionInput")
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit package contents</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />

            <div className="">
              <div className="divider">
                <small className='font-bold text-primary'>Choose thumbnail to upload</small>
              </div>
              <div className="form-control w-full max-w-xs flex mx-auto my-3">
                <input
                  type="file"
                  className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                  accept='.jpg, .jpeg, .png'
                  {...register("imageInput", { onChange: onImageChange })}
                  required
                />
              </div>

              <div className="divider">
                <small>Other required fields</small>
              </div>
              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <input
                  type="text"
                  placeholder={"Enter title to display"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("titleInput")}
                  required
                />
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter comma separated inclusions e.g: wall backdrop, themed balloons, garland"
                  {...register("inclusionsInput")}
                  required
                >
                </textarea>
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter full description"
                  {...register("descriptionInput")}
                  required
                >
                </textarea>
              </div>

              <div className="flex mx-auto form-control w-full max-w-xs my-2">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter short description"
                  {...register("shortDescriptionInput")}
                  required
                >
                </textarea>
              </div>
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
