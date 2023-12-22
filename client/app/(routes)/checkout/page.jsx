import CheckoutForm from "@components/checkout/CheckoutForm"
import getInquiries from "@services/shared/getInquiries"


export default async function Page() {
  const { data: inquiries, error } = await getInquiries()

  return (
    <>
      <CheckoutForm inquiries={inquiries} />
    </>
  )
}
