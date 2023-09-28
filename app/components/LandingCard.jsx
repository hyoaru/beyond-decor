import Image from "next/image"

export default function LandingCard(Props) {
  return (
    <>
      <img
        width={200}
        height={500}
        src={Props.src}
        style={{ width: "200px", height: "500px" }}
        alt="" className='rounded-xl object-cover hidden xl:block'
      />

      <img
        width={400}
        height={250}
        src={Props.src}
        style={{ width: "400px", height: "250px" }}
        alt="" className='rounded-xl object-cover hidden md:block xl:hidden'
      />

      <img
        width={250}
        height={600}
        src={Props.src}
        style={{ width: "250px", height: "600px" }}
        alt="" className='rounded-xl object-cover md:hidden'
      />

    </>
  )
}