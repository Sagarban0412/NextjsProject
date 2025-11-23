import React from "react";

const Table = ({ name, src, status }) => {
  return (
    <div className=" bg-gray-600 p-3 rounded-2xl w-[300px] ">
      <div className="relative">
        <img
          src={src}
          alt="table1"
          className="w-[300px] h-[200px] object-cover rounded-2xl" 
        />
        <span
          className={`absolute top-0 right-0 rounded-sm px-2  bg-black/30 ${
            status === "Available"
              ? "text-green-500"
              : status === "Occupied"
              ? "text-red-500"
              : status === "Reserved"
              ? "text-yellow-500"
              : "text-gray-500"
          }`}
        >
          {status}
        </span>
      </div>
      <div>
        <h1 className="font-bold text-xl text-center">{name}</h1>
      </div>
    </div>
  );
};

export default Table;
