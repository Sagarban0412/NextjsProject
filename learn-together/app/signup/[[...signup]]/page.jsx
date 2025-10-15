import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignupPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <SignUp />
    </div>
  );
};

export default SignupPage;
