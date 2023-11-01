import React from 'react'

export default function CheckoutSubmitStatusModal(props) {
  const { error } = props
  return (
    <>
      <dialog id="CheckoutSubmitStatusModal" className="modal">
        <div className="modal-box">
          <h3 className={`font-bold text-lg ${error ? "text-error" : "text-primary"}`}>Checkout submit status</h3>
          {error 
            ? <p className="py-4 text-error">{error.message}</p>
            : <p className="py-4">"Inquiry has been submitted successfully!</p>
          }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
