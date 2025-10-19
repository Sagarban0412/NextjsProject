"use client"

import { SignUp } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";

const SignupPage = () => {
  const router = useRouter()
  
    const handleHome = ()=>{
      router.push('/')
    }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      {/* <div className='absolute top-12 z-50 flex justify-start w-[500px]'>
          <House size={30} onClick={handleHome} className='cursor-pointer'/>
        </div> */}
      <SignUp />
    </div>
  );
};

export default SignupPage;
