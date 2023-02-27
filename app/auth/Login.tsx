'use client'

import React from 'react'
import {signIn} from 'next-auth/react'

const Login = () => {
  return (
    <li>
        <button 
        onClick={() => signIn()} 
        className='bg-blue-900 text-white px-4 py-1 rounded shadow'
        >
            Sign In
        </button>
    </li>
  )
}

export default Login