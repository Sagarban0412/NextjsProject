import { Calendar } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  const hotelData = [
    {
      title: "Total Revenue",
      amount: "Rs. 12000",
      change: {
        percentage: 3.3,
        isPositive: true,
      },
    },
    {
      title: "Total Transaction",
      amount: "1200",
      change: {
        percentage: 5,
        isPositive: true,
      },
    },
    {
      title: "Average Order",
      amount: "Rs.1200",
      change: {
        percentage: 3.3,
        isPositive: false,
      },
    },
    {
      title: "Occupacy Rate",
      amount: "80%",
      change: {
        percentage: 3.3,
        isPositive: true,
      },
    },
  ];
  return (
    <>
      <div className="w-auto  flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AdminDashboard</h1>
          <p className="text-sm text-gray-400">
            Real-time and historical operational performance of the Hotel
          </p>
        </div>
        <div className="flex justify-center items-center gap-3 border px-4 h-10 rounded-xl">
          <Calendar />
          <form>
            <select className="outline-none">
              <option value="">Last 24 Hours</option>
            </select>
          </form>
        </div>
      </div>

      <div className="flex  justify-evenly my-10 leading-8">
        {hotelData.map((data, index) => (
          <div key={index} className="w-56 py-6 px-4 bg-zinc-800 rounded-2xl">
            <h1 className="text-gray-400">{data.title}</h1>
            <p className="font-bold text-2xl">{data.amount}</p>
            <p
              className={
                data.change.isPositive ? "text-green-500" : "text-red-500"
              }
            >
              {data.change.isPositive ? "+" : "-"}
              {data.change.percentage}%
            </p>
          </div>
        ))}
      </div>

      <div className="flex px-10 gap-4 ">
        <img
          src="/images/chart1.png"
          alt="chart1"
          className="w-[50%] rounded-2xl"
        />
        <img
          src="/images/chart2.png"
          alt="chart2"
          className="w-[50%] rounded-2xl"
        />
      </div>
    </>
  );
};

export default AdminDashboard;
