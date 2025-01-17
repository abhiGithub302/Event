import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="https://cdn.prod.website-files.com/623ae64112adcf772da9687e/677f8f8ec77d58bda785faf6_Textual%20Logo%20White%20(1).svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p>2025 EventEase. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer