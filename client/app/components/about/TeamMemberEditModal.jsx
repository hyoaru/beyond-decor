"use client"

import { useState } from 'react'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordUpdate } from '../../hooks/shared/useCollectionRecordUpdate'

export default function TeamMemberEditModal(props) {
  const { recordId, imgSrc, setState, modalId } = props
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordUpdate, isLoading, error } = useCollectionRecordUpdate({ collectionName: 'team_members' })
  const [imageUrl, setImageUrl] = useState(imgSrc)

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    const imageFile = data.imageInput[0]
    const name = data.nameInput
    const role = data.roleInput

    const formData = new FormData()
    if (imageFile) { formData.append('image_file', imageFile) }
    if (name) { formData.append('name', name) }
    if (role) { formData.append('role', role) }

    await collectionRecordUpdate({ recordId: recordId, formData: formData })
    setState(performance.now())
    document.getElementById(modalId).close()
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Update member</h3>
          <div className="my-4">
            <img
              width={300}
              height={300}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${300}px` }}
              alt="" className={'rounded-xl object-cover flex mx-auto'}
            />

            <div className="divider"><small className='font-bold'>Profile image</small></div>
            <div className="form-control w-full max-w-xs flex mx-auto my-3">
              <input
                type="file"
                className="file-input file-input-md file-input-primary file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                {...register("imageInput", { onChange: onImageChange })}
                required
              />
            </div>

            <div className="divider"><small>Other required fields</small></div>
            <div className="flex flex-col gap-2">
              <div className="flex mx-auto form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder={"Enter name to display"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("nameInput")}
                  required
                />
              </div>
              <div className="flex mx-auto form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder={"Enter role to display"}
                  className="input input-bordered w-full max-w-xs"
                  {...register("roleInput")}
                  required
                />
              </div>
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
