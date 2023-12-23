"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

// App imports
import { ADD_TEAM_MEMBER_FORM_SCHEMA as formSchema } from '@constants/about/forms'
import FormErrorMessage from '@components/shared/FormErrorMessage'
import revalidateAllData from '@services/shared/revalidateAllData'
import useAddTeamMember from '@hooks/about/useAddTeamMember'

export default function TeamMemberAddModal(props) {
  const modalId = 'TeamMemberAddModal'
  const [imageUrl, setImageUrl] = useState()
  const { addTeamMember, isLoading } = useAddTeamMember()

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      role: '',
      imageFile: ''
    }
  })

  function closeAndResetModal() {
    closeModal()
    resetFields()
  }

  function closeModal() {
    document.getElementById(modalId).close()
  }

  function resetFields() {
    document.querySelector('#imageFileInput').value = null
    setImageUrl(null)
    reset()
  }

  function onImageChange() {
    const imageFile = getValues('imageFile')[0]
    if (!imageFile) {
      document.querySelector('#imageFileInput').value = null
      setImageUrl(cardImgSrc)
    } else {
      setImageUrl(URL.createObjectURL(imageFile))
    }
  }


  async function onSubmit(data) {
    await addTeamMember({
      name: data.name,
      role: data.role,
      imageFile: data.imageFile
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast.error("An error has occured.")
        } else {
          await revalidateAllData()
          closeAndResetModal()
          toast.success("Team member has been added successfully.")
        }
      })
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Add team member</h3>
            <div className="my-4">
              {imageUrl && <>
                <Image
                  width={300}
                  height={300}
                  src={imageUrl}
                  style={{ width: `${300}px`, height: `${300}px` }}
                  alt="" className={'rounded-xl object-cover flex mx-auto'}
                />
              </>}

              <div className="divider"><small className='font-bold'>Profile image</small></div>
              <div className="form-control w-full flex mx-auto my-3">
                <input
                  id='imageFileInput'
                  type="file"
                  className="file-input file-input-md file-input-primary file-input-bordered w-full"
                  accept='.jpg, .jpeg, .png'
                  {...register("imageFile", { onChange: onImageChange })}
                />
                {errors.imageFile && <>
                  <FormErrorMessage>{errors.imageFile.message}</FormErrorMessage>
                </>}
              </div>

              <div className="divider"><small>Other required fields</small></div>
              <div className="flex flex-col gap-2">
                <div className="flex mx-auto form-control w-full">
                  <input
                    type="text"
                    placeholder={"Enter name to display"}
                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                    {...register("name")}
                  />
                  {errors.name && <>
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  </>}
                </div>
                <div className="flex mx-auto form-control w-full">
                  <input
                    type="text"
                    placeholder={"Enter role to display"}
                    className={`input input-bordered w-full ${errors.role ? 'input-error' : ''}`}
                    {...register("role")}
                  />
                  {errors.role && <>
                    <FormErrorMessage>{errors.role.message}</FormErrorMessage>
                  </>}
                </div>
              </div>

            </div>
            <div className="modal-action flex">
              <button type='submit' className="btn btn-primary" disabled={isLoading}>
              {
                  isLoading
                    ? <span className='loading loading-ring text-black'></span>
                    : 'Save'
                }
              </button>
              <button onClick={closeAndResetModal} type='button' className="btn">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
