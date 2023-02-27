import React from 'react'
import Link from "next/link"; 
import Login from './Login';
import {getServerSession} from "next-auth/next";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import Logged from './Logged';
//check if the user is logged in or not
//display a client component to allow the user to login

const Nav = async() => {
    const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center mb-10 py-3'>
        <Link href="/">
            <h1 className='font-bold text-blue-600 text-3xl'>
                Bloggy
            </h1>
        </Link>
        <ul className='flex items-center gap-8'>
            {!session?.user && <Login />}
            {session?.user && <Logged image={session.user?.image || ''} />}
        </ul>
    </nav>
  )
}

export default Nav