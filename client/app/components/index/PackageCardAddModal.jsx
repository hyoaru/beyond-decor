"use client"

import { useState } from 'react'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordCreate } from '../../hooks/shared/useCollectionRecordCreate'

export default function PackageCardAddModal(props) {
  const { nextIndex, setState } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordCreate, isLoading, error } = useCollectionRecordCreate({ collectionName: 'package_cards' })
  const [imageUrl, setImageUrl] = useState()

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    const imageFile = data.imageInput[0]
    const title = data.titleInput
    const description = data.descriptionInput

    if (imageFile && title && description) {
      const formData = new FormData()
      formData.append('image_file', imageFile)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('position', nextIndex)

      await collectionRecordCreate({ formData: formData })
      setState(performance.now())
      document.getElementById('AddPackageCardModal').close()

    } else {
      alert('Fill up all fields to proceed.')
    }

  }

  return (
    <>
      <dialog id={'AddPackageCardModal'} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Add package</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imageInput", { onChange: onImageChange })}
                required
              />
            </div>

            <div className="flex mx-auto form-control w-full max-w-xs">
              <input
                type="text"
                placeholder={"Enter title to display"}
                className="input input-bordered w-full max-w-xs"
                {...register("titleInput")}
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <textarea
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Enter description to display"
                {...register("descriptionInput")}
                required
              >
              </textarea>
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
