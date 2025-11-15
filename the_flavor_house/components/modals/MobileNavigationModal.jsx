import Link from "next/link";
import React from "react";

const MobileNavigationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="w-2/3 h-full bg-white p-6 shadow-xl flex flex-col gap-8 relative">
        {/* Close Button */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ×
        </button>

        {/* Navigation Items */}
        <div className="mt-10 flex flex-col gap-6 text-lg font-semibold">
          <Link href={"/waiter"} onClick={() => onClose(false)}>
            Tables
          </Link>
          <Link href={"/orders"} onClick={() => onClose(false)}>
            Orders
          </Link>
          <Link href={"/active-table"} onClick={() => onClose(false)}>
            Active Table
          </Link>
          <Link href={"/logout"} onClick={() => onClose(false)}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationModal;
