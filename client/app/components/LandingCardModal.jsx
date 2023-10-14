"use client"

import React, { useRef, useState } from 'react'
import { useSupabaseContext } from '../context'

export default function LandingCardModal(props) {
  const supabase = useSupabaseContext()
  const [imageUrl, setImageUrl] = useState(`${props.src}?${performance.now()}`)
  const imageInputRef = useRef()
  const quotationInputRef = useRef()

  function handleImageChange() {
    setImageUrl(URL.createObjectURL(imageInputRef.current.files[0]))
  }

  async function handleSave(event) {
    const imageFile = imageInputRef.current.files[0]
    const quotation = quotationInputRef.current.value

    if (imageFile) {
      const { data, error } = await supabase
        .storage
        .from('medias')
        .update(props.imagePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        })
    }

    if (quotation) {
      const { error } = await supabase
        .from('landing_cards')
        .update({ quotation: quotation })
        .eq('id', props.cardId)
    }
  }

  return (
    <>
      <dialog id={props.modalID} className="modal ">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg">Edit card contents</h3>
          <div className="my-4">
            <img
              width={300}
              height={450}
              src={imageUrl}
              style={{ width: `${300}px`, height: `${450}px` }}
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

            <div className="flex mx-auto">
              <input ref={quotationInputRef} type="text" placeholder={"Enter quotation to display"} className="input input-bordered w-full max-w-xs" />
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
