import Link from 'next/link'
import React from 'react'

export default function CheckoutSubmitStatusModal(props) {
  const { error } = props
  return (
    <>
      <dialog id="CheckoutSubmitStatusModal" className="modal">
        <div className="modal-box text-center py-10">
          <h1 className={`font-bold text-2xl ${error ? "text-error" : "text-primary"}`}>Checkout submit status</h1>
          {error
            ? <p className="py-4 text-error">{error.message}</p>
            : <>
              <p className="pt-4 font-bold">Inquiry has been submitted successfully!</p>
              <p>We'll reach out to you <span className='text-primary'>within 1-2 business days</span>. In the mean time, how about you give our works a view?</p>
              <Link href={"/works"} className='btn btn-primary btn-sm btn-outline mt-5'>View our portfolio</Link>
            </>
          }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
