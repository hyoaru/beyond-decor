"use client"

import React, { useRef, useState } from 'react'
import { useSupabaseContext } from '../context'

export default function PackageCardModal(props) {
  const supabase = useSupabaseContext()
  const [imageUrl, setImageUrl] = useState(`${props.src}?${performance.now()}`)
  const imageInputRef = useRef()
  const titleInputRef = useRef()
  const descriptionInputRef = useRef()

  function handleImageChange() {
    setImageUrl(URL.createObjectURL(imageInputRef.current.files[0]))
  }

  async function handleSave(event) {
    event.preventDefault()
    
    const imageFile = imageInputRef.current.files[0]
    const title = titleInputRef.current.value
    const description = descriptionInputRef.current.value

    if (imageFile) {
      const { data, error } = await supabase
        .storage
        .from('medias')
        .update(props.imagePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        })
    }

    if (title) {
      const { error } = await supabase
        .from('package_cards')
        .update({ title: title })
        .eq('id', props.cardId)
    }

    if (description) {
      const { error } = await supabase
        .from('package_cards')
        .update({ description: description })
        .eq('id', props.cardId)
    }

    window.location.href="/"
  }

  return (
    <>
      <dialog id={props.modalId} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-4">Edit card contents</h3>
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
              />
            </div>

            <div className="flex mx-auto form-control w-full max-w-xs">
              <input ref={titleInputRef} type="text" placeholder={"Enter title to display"} className="input input-bordered w-full max-w-xs" />
            </div>

            <div className="flex mx-auto mt-2 form-control w-full max-w-xs">
              <textarea ref={descriptionInputRef} className="textarea textarea-bordered w-full max-w-xs" placeholder="Enter description to display"></textarea>
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
