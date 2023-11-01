"use client"

import { useState } from 'react'
import Image from 'next/image'

// App imports
import { useForm } from 'react-hook-form'
import { useCollectionRecordCreate } from '../../_hooks/shared/useCollectionRecordCreate'
import { resizeImage } from '@/app/_libraries/shared/resizeImage'

export default function TeamMemberAddModal(props) {
  const { setState } = props
  const modalId = 'TeamMemberAddModal'
  const { register, handleSubmit, reset, resetField, getValues } = useForm()
  const { collectionRecordCreate, isLoading, error } = useCollectionRecordCreate({ collectionName: 'team_members' })
  const [imageUrl, setImageUrl] = useState()

  function onImageChange() { setImageUrl(URL.createObjectURL(getValues("imageInput")[0])) }

  async function onSubmit(data) {
    try {
      const imageFile = await resizeImage(data.imageInput[0])
      const name = data.nameInput
      const role = data.roleInput

      if (imageFile && name && role) {
        const formData = new FormData()
        formData.append('image_file', imageFile)
        formData.append('name', name)
        formData.append('role', role)

        await collectionRecordCreate({ formData: formData })
        reset()
        setState(performance.now())
        document.getElementById(modalId).close()

      } else {
        alert('Fill up all fields to proceed.')
      }

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Add member</h3>
          <div className="my-4">
            <Image
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
