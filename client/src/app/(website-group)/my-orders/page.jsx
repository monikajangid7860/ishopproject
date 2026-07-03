"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosApiInstance } from "@/helper/helper";

export default function MyOrders() {
  const user = useSelector((state) => state.user?.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    axiosApiInstance
      .get(`/order?user_id=${user._id}`)
      .then((res) => {
        if (res.data.flag) {
          setOrders(res.data.orders);
        }
      });
  }, [user]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-4 bg-white"
          >
            <div className="flex justify-between text-sm">
              <span>Order ID: {order._id}</span>
              <span className="font-medium">{order.status}</span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Total: ₹{order.total}
            </p>

            <p className="text-xs text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
