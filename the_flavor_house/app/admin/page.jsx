import React from 'react'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import AdminDashboard from '@/components/AdminDashboard';

const page =async () => {
  const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = token ? jwtDecode(token) : null;
  
    // If no token, redirect to login
    if (!token) {
      redirect("/");
    }
  return (
    <div>
      <AdminDashboard/>
    </div>
  )
}

export default page