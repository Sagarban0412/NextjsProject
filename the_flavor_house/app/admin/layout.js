import React from "react";
import WaiterSidebar from "@/components/WaiterSidebar";
import AdminSidebar from "@/components/AdminSidebar";

export default function  WaiterLayout ({ children }) {
  return (
    <div>
      <div className="bg-black/90 text-white flex ">
        <div className="bg-zinc-700 w-[20%] h-screen shadow-2xl hidden md:flex">
          <AdminSidebar />
        </div>
        <div className="w-screen p-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

