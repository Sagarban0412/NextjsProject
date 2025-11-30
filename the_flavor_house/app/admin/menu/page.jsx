"use client";

import { Cross, Pencil, Plus, Search, Settings, Trash, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import CreateMenuItems from "@/components/CreateMenuItems";
import axios from "axios";

const page = () => {
  const categories = [
    "All Items",
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
    "Drinks",
  ];
  const [itemsInfo, setItemsInfo] = useState([]);
  const [available, setAvailable] = useState(true);
  const [isOpen, setIsOpen] = useState("All Items");
  const [showModal, setShowModal] = useState(false);

  const handleSwitch = (ItemName) => {
    setAvailable(!available);
    console.log(ItemName);
  };

  const handleAddMenu = () => {
    setShowModal(true);
  };

  useEffect(() => {
    try {
      const fetchItems = async () => {
        // Fetch menu items from the server or API
        const res = await axios.get("/api/foodItems");
        setItemsInfo(res.data);
      };
      fetchItems();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  

  return (
    <div className="relative">
      <div className="w-auto  flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-sm text-gray-400">
            Create or Manage a new Menu for your hotel
          </p>
        </div>
        <div
          className="flex justify-center items-center gap-3 cursor-pointer px-4 h-10 rounded-xl bg-blue-700"
          onClick={handleAddMenu}
        >
          <Plus />
          <h1>Add New Menu</h1>
        </div>
      </div>

      <div className="p-10 flex gap-4">
        <div className="w-[20%] p-3">
          {" "}
          {/*bg-[#161D2B]*/}
          <h1 className="text-gray-400 font-bold text-xl">Category</h1>
          <div className="flex flex-col gap-3 my-3">
            {categories.map((data, index) => (
              <div
                key={index}
                className={`${
                  isOpen === data ? "bg-gray-700" : ""
                } py-1 px-3 cursor-pointer text-gray-400 rounded-sm`}
                onClick={() => setIsOpen(data)}
              >
                {data}
              </div>
            ))}
          </div>
          <hr className="bg-gray-500" />
          <div className="flex items-center justify-center py-3 gap-2 cursor-pointer">
            <Settings />
            <h1>Manage Category</h1>
          </div>
        </div>
        <div className="w-[80%] h-[750px]">
          {/* Menu Items will be displayed here */}
          <form className="flex relative border-2 rounded-sm items-center bg-zinc-700 px-2 mb-5">
            <Search className="absolute" size={40} />
            <input
              type="search"
              className="w-full px-8 h-10 outline-none"
              placeholder="Search for Menu Item By Name"
            />
          </form>
          <div>
            <Table className={"border"}>
              <TableHeader>
                <TableRow className={"py-2"}>
                  <TableHead className={"text-white font-medium text-xl"}>
                    Items
                  </TableHead>
                  <TableHead className={"text-white font-medium text-xl"}>
                    Category
                  </TableHead>
                  <TableHead className={"text-white font-medium text-xl"}>
                    Price
                  </TableHead>
                  <TableHead className={"text-white font-medium text-xl"}>
                    Availability
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsInfo
                  .filter((item) => {
                    if (isOpen === "All Items") return true;
                    return item.category?.name === isOpen || item.category === isOpen;
                  })
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-3 text-xl">
                        <Image
                          src={item.image || null}
                          width={40}
                          height={40}
                          className="rounded-sm"
                          alt="items"
                        />
                        <h1>{item.name}</h1>
                      </TableCell>
                      <TableCell>{item.category?.name || item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        <Switch
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-600"
                          defaultChecked
                          onCheckedChange={() => handleSwitch(item.name)}
                        />
                      </TableCell>
                      <TableCell
                        className={"flex items-end justify-center gap-3"}
                      >
                        <Pencil />
                        <Trash />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="bg-black/5 absolute top-14 right-64">
          <CreateMenuItems setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
};

export default page;
