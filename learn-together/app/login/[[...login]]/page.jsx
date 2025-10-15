import { SignIn } from '@clerk/nextjs'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        {/* <h1>Login Page</h1> */}
        <SignIn/>
    </div>
  )
}

export default LoginPage