import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/assets/images/exam-paper.svg"
            alt="logo"
            width={40}
            height={40}
          />
        </Link>

        <p>2023 GradeBook. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer