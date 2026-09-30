import React from "react";
import WaiterSidebar from "@/components/WaiterSidebar";

export default function WaiterLayout({ children }) {
  return (
    <div className="bg-black/90 text-white min-h-screen">
      <WaiterSidebar />
      <div className="ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
};

