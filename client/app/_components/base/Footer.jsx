import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="footer items-center border-t py-4 px-5">
        <div className='flex flex-col gap-3 w-full sm:items-center content-center sm:gap-0 sm:flex-row'>

          <div className="grid grid-flow-row gap-0 mx-auto sm:me-auto sm:w-3/12 order-1">
            <h2 className='text-xl font-bold text-center sm:text-left'>Beyond Decor</h2>
            <p className='text-xs text-center sm:text-left'>Turning events into priceless memories since 2016.</p>
          </div>
          <div className="order-3 mx-auto sm:w-6/12  sm:me-auto sm:order-2">
            <p className='text-center'><Link href="/admin">© 2023 Beyond Decor. All Rights Reserved.</Link></p>
          </div>
          <div className="order-2 mx-auto sm:w-3/12 sm:order-3">
            <div className="flex flex-col">
              <div className="sm:ms-auto flex gap-2 items-center justify-center">
                <p className='text-xs font-bold uppercase'>Contact us</p>
                <a href="https://www.facebook.com/beyonddecorph" target='_blank' className='tooltip tooltip-left' data-tip="www.facebook.com/beyonddecorph">
                  <FontAwesomeIcon icon={faFacebook} size='xl' />
                </a>
                <a href="mailto:beyonddecoreventsph@gmail.com" className='tooltip tooltip-left' data-tip="beyonddecoreventsph@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} size='xl' />
                </a>
              </div>
              <div className='ms-auto mt-[3px]'>
                <p className='text-xs text-center sm:text-right'>0953-239-7219 | San Pablo City, Laguna</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
