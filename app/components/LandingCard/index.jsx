"use client";

import { useState } from "react";

// App imports
import Card from "./Card";

export default function LandingCard(props) {
  const [quotation, setQuotation] = useState(" ")

  return (
    <>
      <Card
        src={props.src}
        width={200}
        height={450}
        quotation={quotation}
        additionalClasses={"hidden xl:block"}
        onLoad={() => { setQuotation(props.quotation) }}
        modalID={props.modalID}
      />

      <Card
        src={props.src}
        width={400}
        height={250}
        quotation={quotation}
        additionalClasses={"hidden md:block xl:hidden"}
        onLoad={() => { setQuotation(props.quotation) }}
        modalID={props.modalID}
      />

      <Card
        src={props.src}
        width={250}
        height={600}
        quotation={quotation}
        additionalClasses={"md:hidden"}
        onLoad={() => { setQuotation(props.quotation) }}
        modalID={props.modalID}
      />
    </>
  )
}