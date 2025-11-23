"use client";
import React from "react";
import Table from "./Table";
import { useRouter } from "next/navigation";

const AllTables = ({ status }) => {
  const router = useRouter();

  const tables = [
    {
      id: 1,
      tableName: "Table-1",
      status: "Available",
      src: "/images/table1.jpg",
    },
    {
      id: 2,
      tableName: "Table-2",
      status: "Reserved",
      src: "/images/table2.jpg ",
    },
    {
      id: 3,
      tableName: "Table-3",
      status: "Available",
      src: "/images/table1.jpg",
    },
    {
      id: 4,
      tableName: "Table-4",
      status: "Occupied",
      src: "/images/table2.jpg",
    },
    {
      id: 5,
      tableName: "Table-5",
      status: "Available",
      src: "/images/table1.jpg",
    },
    {
      id: 6,
      tableName: "Vip-Table",
      status: "Occupied",
      src: "/images/vip table.jpg",
    },
  ];

  const checkStatus = (table) => {
    if (status === "All") {
      return table;
    }
    return table.status === status;
  };

  const handleTableRoute = (Name) => {
    router.push(`/waiter/table/${Name}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-6 gap-4">
      {tables.filter(checkStatus).map((table) => (
        <div key={table.id} onClick={() => handleTableRoute(table.tableName)}>
          <Table name={table.tableName} src={table.src} status={table.status} />
        </div>
      ))}
    </div>
  );
};

export default AllTables;
