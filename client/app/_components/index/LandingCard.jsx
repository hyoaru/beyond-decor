import Image from "next/image";

export default function LandingCard(props) {
  const { imgSrc, quotation, className } = props;

  return (
    <>
      <div className={`group/card relative ${className}`}>
        <div className="prose absolute flex w-full h-full p-10 opacity-0 transition-all ease-in-out duration-500 group-hover/card:opacity-100">
          <h4 className="text-center font-bold mx-auto my-auto">{quotation}</h4>
        </div>

        <Image
          width={250} height={600}
          src={imgSrc} alt="" 
          className={'rounded-box object-cover shadow-lg transition-all ease-in-out duration-500 w-[250px] h-[600px] xl:h-[450px] xl:w-[180px] group-hover/card:opacity-20'}
        />
      </div>

    </>
  )
}
