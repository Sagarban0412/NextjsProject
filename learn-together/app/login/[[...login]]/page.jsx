"use client"
import { SignIn } from '@clerk/nextjs'
import { House } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'


const LoginPage = () => {
  const router = useRouter()

  const handleHome = ()=>{
    router.push('/')
  }
  return (
    <div className='relative w-full h-screen flex flex-col justify-center items-center'>
        <div className='absolute top-32 z-50 flex justify-start w-[500px]'>
          <House size={30} onClick={handleHome} className='cursor-pointer'/>
        </div>
        <SignIn/>
    </div>
  )
}

export default LoginPage