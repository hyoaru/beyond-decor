"use client";

import React from 'react'

// App imports
import TeamMembers from './TeamMembers'
import { useAuthStateContext } from '../context'

export default function page() {
  const authState = useAuthStateContext()

  return (
    <>
      <div className="mx-6 my-20">
        <div className="prose max-w-none md:prose-lg text-center">
          <h1 className='leading-normal'>
            {'Meet the team '}
            <span className='bg-primary p-1 text-white rounded-xl rounded-tr-none rounded-bl-none'>Beyond Decor</span>
          </h1>
          <p className='mx-auto md:w-11/12 lg:w-9/12 xl:w-8/12'>
            The Beyond Decor team is a trio of creative individuals who initially embarked on their journey by delving into do-it-yourself projects. Based in San Isidro, San Pablo City, Laguna, their passion for crafting unforgettable events has evolved into a thriving business, where they continue to infuse their artistic talents into every occasion they touch.
          </p>
        </div>

        {authState.isAdmin && <>
          <div className="text-center my-10">
            <span
              className="text-primary font-mono opacity-40 text-sm cursor-pointer"
              onClick={() => { document.getElementById('TeamMemberAddModal').showModal() }}
            >
              {"[ add member ]"}
            </span>
          </div>
        </>}

        <TeamMembers isAdmin={authState.isAdmin} />
      </div>
    </>
  )
}