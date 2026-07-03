"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { axiosApiInstance } from "@/helper/helper";
import ChartCard from "./ChartCard";

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await axiosApiInstance.get("/admin/analytics/dashboard");
       console.log("Revenue data", res.data);
      // format backend data → chart data
      const formatted = res.data.revenue.map(d => ({
        date: `${d._id.day}/${d._id.month}`,
        revenue: d.totalRevenue,
        orders: d.orders
      }));

      setData(formatted);
    }
    load();
  }, []);

  return (
    <ChartCard title="Revenue Last 7 Days">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
