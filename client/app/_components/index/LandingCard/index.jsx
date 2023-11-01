// App imports
import BaseCard from "./BaseCard";

export default function LandingCard(props) {
  const { imgSrc, quotation, modalIdToTrigger, isAdmin } = props;
  function onClick() { 
    if (isAdmin) {
      document.getElementById(`${modalIdToTrigger}`).showModal() 
    }
  }

  return (
    <>
      <BaseCard
        imgSrc={imgSrc}
        imgWidth={180}
        imgHeight={450}
        quotation={quotation}
        additionalClasses={"hidden xl:block"}
        modalIdToTrigger={modalIdToTrigger}
        isAdmin={isAdmin}
        onClick={onClick}
      />

      <BaseCard
        imgSrc={imgSrc}
        imgWidth={400}
        imgHeight={250}
        quotation={quotation}
        additionalClasses={"hidden md:block xl:hidden"}
        modalIdToTrigger={modalIdToTrigger}
        isAdmin={isAdmin}
        onClick={onClick}
      />

      <BaseCard
        imgSrc={imgSrc}
        imgWidth={250}
        imgHeight={600}
        quotation={quotation}
        additionalClasses={"md:hidden"}
        modalIdToTrigger={modalIdToTrigger}
        isAdmin={isAdmin}
        onClick={onClick}
      />
    </>
  )
}