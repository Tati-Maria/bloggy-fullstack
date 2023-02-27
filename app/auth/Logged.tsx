'use client'

import Image from "next/image"
import {signOut} from "next-auth/react"
import Link from "next/link";

type LoggedProps = {
    image: string 
}

const Logged = ({image}: LoggedProps) => {
  return (
    <li className="flex gap-8 items-center">
        <button
        onClick={() => signOut()}
        className='bg-blue-700 text-white px-4 py-1 rounded shadow'
        >
            Sign Out
        </button>
        <Link href="/dashboard">
            <Image 
            width={54}
             height={54} 
             src={image}
             alt="user image"
             className="w-14 rounded-full"
             priority
              />
        </Link>
    </li>
  )
}

export default Logged