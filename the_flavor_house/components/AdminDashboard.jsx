import { Calendar } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
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
    </>
  );
};

export default AdminDashboard;
