"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'

// App imports
import { UPDATE_ADDONS_BASE_FORM_SCHEMA as formSchema } from '@constants/packages/forms'
import FormErrorMessage from '@components/shared/FormErrorMessage'
import revalidateAllData from '@services/shared/revalidateAllData'
import useUpdateAddons from '@hooks/packages/useUpdateAddons'

export default function AddOnsUpdateModal(props) {
  const { addOnCard, modalId } = props
  const { id: recordId, title, category, price } = addOnCard
  const { updateAddons, isLoading } = useUpdateAddons()

  const { handleSubmit, register, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      category: category,
      price: price,
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
    reset()
  }

  async function onSubmit(data) {
    await updateAddons({
      recordId: recordId,
      title: data.title,
      category: data.category,
      price: data.price,
    })
      .then(async ({ data, error }) => {
        if (error) {
          toast.error("An error has occured.")
        } else {
          await revalidateAllData()
          closeModal()
          toast.success("Addons has been updated successfully.")
        }
      })
  }

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div className="modal-box max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mt-4">Update add-on</h3>
            <div className="my-4">
              <div className="">
                <div className="flex mx-auto form-control w-full my-2">
                  <input
                    type="text"
                    placeholder={"Enter title to display"}
                    className="input input-bordered w-full"
                    {...register("title")}
                  />
                  {errors.title && <>
                    <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <input
                    type="text"
                    placeholder={"Enter category"}
                    className="input input-bordered w-full"
                    {...register("category")}
                  />
                  {errors.category && <>
                    <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                  </>}
                </div>

                <div className="flex mx-auto form-control w-full my-2">
                  <input
                    type="number"
                    placeholder={"Enter price"}
                    className="input input-bordered w-full"
                    {...register("price")}
                  />
                  {errors.price && <>
                    <FormErrorMessage>{errors.price.message}</FormErrorMessage>
                  </>}
                </div>
              </div>
            </div>
            <div className="modal-action flex">
              <button type='submit' className="btn btn-primary" disabled={isLoading}>Save</button>
              <button onClick={closeAndResetModal} type='button' className="btn">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
