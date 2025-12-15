"use client";

import React from "react";
import { useParams } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import ItemCard from "@/components/ItemCard";

const page = () => {
  const params = useParams();
  const table = params.slug;
  return (
    <>
      <div>
        <div className="flex items-center gap-1 border w-32 px-4 py-2 rounded-2xl">
          <UtensilsCrossed size={30} />
          <h1 className="text-xl">{table}</h1>
        </div>
        <div className="w-full flex">
          <div className="mt-6 flex-1">
            <ItemCard />
          </div>
          <div className="bg-gray-400 min-w-[500px] ">
            <h1 className="h-15 flex items-center border">Check-Out</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
