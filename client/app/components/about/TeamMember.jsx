export default function TeamMember(props) {
  const { memberId, name, role, imgSrc } = props
  const baseClass = "rounded-xl rounded-tr-none rounded-bl-none"
  const imgSizeInPx = 200

  return (
    <>
      <div className={`${baseClass} border p-10 w-[400x] flex flex-col items-center`}>
        <img
          src={imgSrc}
          height={imgSizeInPx}
          width={imgSizeInPx}
          style={{ width: `${imgSizeInPx}px`, height: `${imgSizeInPx}px`}}
          className={`${baseClass} object-cover`}
        />

        <div className="prose max-w-none mt-5 text-center">
          <h3 className='mb-0'>{name}</h3>
          <p className='mt-0 '>{role}</p>
        </div>
      </div>
    </>
  )
}
