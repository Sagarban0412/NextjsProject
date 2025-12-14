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
    <div className="flex items-center gap-1 border w-32 px-4 py-2 rounded-2xl">
      <UtensilsCrossed size={30} />
      <h1 className="text-xl">{table}</h1>
    </div>
    <div className="mt-6">
      <ItemCard/>
    </div>
    </>
  );
};

export default page;
