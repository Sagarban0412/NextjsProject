import React from "react";
import WaiterSidebar from "@/components/WaiterSidebar";

export default function  WaiterLayout ({ children }) {
  return (
    <div>
      <div className="bg-black/90 text-white flex ">
        <div className="bg-zinc-700 w-[20%] h-screen shadow-2xl">
          <WaiterSidebar />
        </div>
        <div className="w-screen p-8">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Table OverView</h1>
              <p className="font-light text-sm text-gray-100">
                Real-time Status of all Resturant Table
              </p>
            </div>
            <button className="bg-gray-500 px-4  rounded-xl border cursor-pointer font-bold">
              Add Party
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

