"use client"

import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


// App imports
import { useSupabaseContext } from '../context'

export default function AddPackageCardModal(props) {
  const supabase = useSupabaseContext()
  const folderName = 'package-cards'
  const [imageUrl, setImageUrl] = useState()
  const imageInputRef = useRef()
  const titleInputRef = useRef()
  const descriptionInputRef = useRef()

  function handleImageChange() {
    setImageUrl(URL.createObjectURL(imageInputRef.current.files[0]))
    console.log(imageInputRef.current.files[0])
  }

  async function handleSave(event) {
    event.preventDefault()

    const imageFile = imageInputRef.current.files[0]
    const title = titleInputRef.current.value
    const description = descriptionInputRef.current.value

    if (imageFile && title && description) {
      const generatedFileName = `${uuidv4}-${imageFile.name}`

      const { data, error } = await supabase
        .storage
        .from('medias')
        .update(`${folderName}/${generatedFileName}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (data) {
        const { error } = await supabase
          .from('package_cards')
          .insert({
            image_path: `${folderName}/${generatedFileName}`,
            title: title,
            description: description
          })
      }
      window.location.href = "/"

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
                ref={imageInputRef}
                type="file"
                className="file-input file-input-md file-input-bordered w-full max-w-xs"
                accept='.jpg, .jpeg, .png'
                onChange={handleImageChange}
                required
              />
            </div>

            <div className="flex mx-auto form-control w-full max-w-xs">
              <input
                ref={titleInputRef}
                type="text"
                placeholder={"Enter title to display"}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <textarea
                ref={descriptionInputRef}
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Enter description to display"
                required
              >
              </textarea>
            </div>
          </div>
          <div className="modal-action flex">
            <form>
              <button onClick={handleSave} className="btn btn-neutral">Save</button>
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
