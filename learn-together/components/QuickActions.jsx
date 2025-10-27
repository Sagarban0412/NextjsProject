"use client"

import React from "react";
import { Eye, Plus, SquareKanban } from "lucide-react";
import { useRouter } from "next/navigation";

const QuickActions = () => {
    const router = useRouter();
    const handleCreate = ()=>{
        router.push('/teacher/create/posts')
    }
  return (
    <>
      <div className="flex-1 w-full h-full py-10 shadow-lg rounded-xl">
        <h1 className="text-sm md:text-lg font-semibold ml-5">Quick Actions</h1>
        <div className="flex gap-5 mt-5 items-center mx-2 md:mx-10 px-3 md:px-10 h-13 rounded-xl shadow-sm border-2 cursor-pointer hover:bg-gray-200" onClick={handleCreate}>
          <Plus size={30} />
          <h2 className="text-sm md:text-lg">Create a Post</h2>
        </div>
        <div className="flex gap-5 mt-5 items-center mx-2 md:mx-10 px-3 md:px-10 h-13 rounded-xl shadow-sm border-2 cursor-pointer hover:bg-gray-200">
          <Eye size={30} />
          <h2 className="text-sm md:text-lg">View Report</h2>
        </div>
        <div className="flex gap-5 mt-5 items-center mx-2 md:mx-10 px-3 md:px-10 h-13 rounded-xl shadow-sm border-2 cursor-pointer hover:bg-gray-200">
          <SquareKanban size={30} />
          <h2 className="text-sm md:text-lg">Manage Student</h2>
        </div>
      </div>
    </>
  );
};

export default QuickActions;
