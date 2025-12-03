"use client";

import { Pencil, Plus, Search, Trash, X } from "lucide-react";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const page = () => {
  const [showModal, setShowModal] = useState(false);
  const handleAddStaff = () => {
    setShowModal(true);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", form);
    setShowModal(false)
  };
  return (
    <div className="relative">
      <div>
        <div className="w-auto  flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-sm text-gray-400">
              Create or Manage a new Staff in the restaurant
            </p>
          </div>
          <div
            className="flex justify-center items-center gap-3 cursor-pointer px-4 h-10 rounded-xl bg-blue-700"
            onClick={handleAddStaff}
          >
            <Plus />
            <h1>Add New Staff</h1>
          </div>
        </div>
        <form className="flex gap-5 mt-3">
          <div className="flex flex-1 relative border-2 rounded-sm items-center bg-zinc-700 px-2 mb-5">
            <Search className="absolute" size={40} />
            <input
              type="search"
              className="w-full px-8 h-10 outline-none"
              placeholder="Search for Staff By Name"
            />
          </div>
          <div className=" flex justify-center items-center h-10 gap-5 border rounded-sm px-2 bg-black">
            <h1>Status: </h1>
            <select name="" id="" className="outline-none bg-black">
              <option value="">All</option>
              <option value="">Manager</option>
              <option value="">Admin</option>
              <option value="">Waiter</option>
            </select>
          </div>
        </form>
      </div>

      <div className="px-30 ">
        <Table>
          <TableHeader>
            <TableRow className={"bg-zinc-600"}>
              <TableHead className="text-white font-medium text-xl">
                User
              </TableHead>
              <TableHead className={"text-white font-medium text-xl"}>
                Role
              </TableHead>
              <TableHead className={"text-white font-medium text-xl"}>
                Last Login
              </TableHead>
              <TableHead className=" text-white font-medium text-xl">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium flex items-center gap-2">
                <img
                  src="/images/avatar.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="font-bold text-sm">Sagar Ban</h1>
                  <p className="font-light text-sm text-gray-300">
                    Sagarban2021@gmail.com
                  </p>
                </div>
              </TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>2025/12/03</TableCell>
              <TableCell className="text-right flex gap-5 items-end">
                <Pencil className="text-blue-600 cursor-pointer" />
                <Trash className="text-red-600 cursor-pointer" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {showModal && (
        <div className="w-[800px] h-[700px] bg-black/90 absolute top-28 right-[400px] rounded-3xl p-4 ">
          {/* Modal content for adding/updating staff would go here */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-bold text-xl">Create new User</h1>
            <X
              size={40}
              className="cursor-pointer"
              onClick={() => setShowModal(false)}
            />
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="border rounded-md p-2"
                placeholder="Enter the Username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="border rounded-md p-2"
                placeholder="Enter your Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="border rounded-md p-2 bg-black"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="waiter">Waiter</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="border rounded-md p-2"
                placeholder="Enter your Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
