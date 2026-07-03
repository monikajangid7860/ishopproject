"use client";
import React from "react";
import { ShoppingBag, Users, CreditCard, BarChart2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import AdminOrderStatus from "@/components/admin/AdminOrderStatus";
import { useEffect } from "react";
import { initAdminSocket } from "@/socket/adminSocket";
import { toast } from "react-toastify";
import RevenueChart from "@/components/admin/RevenueChart";


export default function AdminDashboard() {

  useEffect(() => {
    const socket = initAdminSocket();

    socket.on("connect", () => {
      console.log("🟢 Admin socket connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
}, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">

      {/* Top Header */}
      <header className="flex items-center justify-between bg-white p-5 rounded-xl shadow-md mb-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow">
          Download Report
        </button>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
  <RevenueChart />
</div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h2 className="text-3xl font-semibold mt-1">$12,540</h2>
            </div>
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg shadow-sm">
              <ShoppingBag size={22} />
            </div>
          </div>
          <p className="text-green-600 text-sm font-medium mt-3 flex items-center gap-1">
            <ArrowUpRight size={16}/> 12% this month
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">New Users</p>
              <h2 className="text-3xl font-semibold mt-1">940</h2>
            </div>
            <div className="h-12 w-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg shadow-sm">
              <Users size={22} />
            </div>
          </div>
          <p className="text-red-600 text-sm font-medium mt-3 flex items-center gap-1">
            <ArrowDownRight size={16}/> 2% this month
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Orders</p>
              <h2 className="text-3xl font-semibold mt-1">1,230</h2>
            </div>
            <div className="h-12 w-12 bg-green-100 text-green-600 flex items-center justify-center rounded-lg shadow-sm">
              <CreditCard size={22} />
            </div>
          </div>
          <p className="text-green-600 text-sm font-medium mt-3 flex items-center gap-1">
            <ArrowUpRight size={16}/> 8% this month
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <h2 className="text-3xl font-semibold mt-1">$84,320</h2>
            </div>
            <div className="h-12 w-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-lg shadow-sm">
              <BarChart2 size={22} />
            </div>
          </div>
          <p className="text-green-600 text-sm font-medium mt-3 flex items-center gap-1">
            <ArrowUpRight size={16}/> 15% this month
          </p>
        </div>

      </div>

        <AdminOrderStatus />
      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* Recent Orders */}

        {/* Top Products */}
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>

          <ul className="space-y-3">
            <li className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition">
              <span className="text-gray-700">Wireless Headphones</span>
              <span className="font-semibold">530 sold</span>
            </li>

            <li className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition">
              <span className="text-gray-700">Smart Watch</span>
              <span className="font-semibold">410 sold</span>
            </li>

            <li className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition">
              <span className="text-gray-700">Bluetooth Speaker</span>
              <span className="font-semibold">350 sold</span>
            </li>
          </ul>
        </div> */}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6">
        © 2025 TailAdmin Ecommerce Dashboard
      </footer>

    </div>
  );
}
