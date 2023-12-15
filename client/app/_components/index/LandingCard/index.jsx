// App imports
import BaseCard from "./BaseCard";

export default function LandingCard(props) {
  const { imgSrc, quotation } = props;

  return (
    <>
      <BaseCard
        imgSrc={imgSrc}
        imgWidth={180}
        imgHeight={450}
        quotation={quotation}
        className={"hidden xl:block"}
      />

      <BaseCard
        imgSrc={imgSrc}
        imgWidth={250}
        imgHeight={600}
        quotation={quotation}
        className={"xl:hidden"}
      />
    </>
  )
}