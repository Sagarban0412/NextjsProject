"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const WaiterFilterBar = () => {
  const filter = [
    {
      name: "All",
      color: "text-white",
    },
    {
      name: "Available",
      color: "text-green-600",
    },
    {
      name: "Occupied",
      color: "text-red-600",
    },
    {
      name: "Reserved",
      color: "text-yellow-600",
    },
    {
      name: "Needs Cleaning",
      color: "text-blue-800",
    },
  ];

  const [isActive, setIsActive] = useState("All");

  return (
    <>
      <div className="flex justify-between gap-4">
        <form className="relative w-[500px] flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-white" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-600 p-1 pl-10 rounded-xl text-white placeholder-gray-300 outline-none"
          />
        </form>
        <div className="flex gap-5">
          {filter.map((items, index) => (
            <div onClick={() => setIsActive(items.name)} key={index}>
              <button
                className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                  isActive === items.name
                    ? "bg-blue-500 text-white"
                    : `${items.color}`
                }`}
              >
                {items.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WaiterFilterBar;
