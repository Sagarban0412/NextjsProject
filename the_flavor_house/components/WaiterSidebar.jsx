"use client";

import {
  ChartNoAxesColumn,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  SettingsIcon,
  SquareMenu,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const WaiterSidebar = () => {
  const [isActive, setIsActive] = useState("Dashboard");
  const base = "/waiter";
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      href: `${base}`,
    },
    {
      name: "Orders",
      icon: <Receipt />,
      href: `${base}/orders`,
    },
    {
      name: "Menu",
      icon: <SquareMenu />,
      href: `${base}/menu`,
    },

    {
      name: "Analytics",
      icon: <ChartNoAxesColumn />,
      href: `${base}/analytics`,
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      href: `${base}/settings`,
    },
  ];
  return (
    <>
      <div className="px-6 py-5 flex flex-col justify-between h-screen">
        <div className="flex-1">
          <div className="flex gap-3 items-center">
            <img src="/images/avatar.png" className="w-10 h-10 rounded-full" alt="avatar" />
            <div>
              <h1 className="font-semibold text-lg">John Doe</h1>
              <p className="text-sm font-light text-gray-300">Waiter</p>
            </div>
          </div>
          <div className="mt-5">
            {menu.map((items,index) => (
              <div key={index} onClick={() => setIsActive(items.name)}>
                <Link
                  href={items.href}
                  className={`flex gap-3 items-center py-3 px-2 rounded-lg cursor-pointer ${
                    isActive === items.name
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {items.icon}
                  <p className="text-sm font-semibold text-gray-300">
                    {items.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 cursor-pointer">
            <LogOut  size={30}/>
            <h1>Logout</h1>
        </div>
      </div>
    </>
  );
};

export default WaiterSidebar;
