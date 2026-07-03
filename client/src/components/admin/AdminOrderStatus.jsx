"use client";

import { useEffect, useState } from "react";
import { axiosApiInstance } from "@/helper/helper";
import { initAdminSocket } from "@/socket/adminSocket";

const STATUS_OPTIONS = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  /* ---------------- FETCH ORDERS (INITIAL LOAD) ---------------- */
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axiosApiInstance.get("/order/admin/recent");
      if (res.data.flag) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Fetch orders failed", err);
    }
  }

  /* ---------------- SOCKET : LIVE NEW ORDERS ---------------- */
   useEffect(() => {
    // 🔥 ALWAYS INIT FIRST
    const socket = initAdminSocket();

    if (!socket) return; // 🛡️ safety guard

    socket.on("order:new", (newOrder) => {
      console.log("🟢 New order received", newOrder);

      setOrders((prev) => {
        // prevent duplicates
        const exists = prev.some(
          (o) => o._id === newOrder.orderId
        );
        if (exists) return prev;

        return [
          {
            _id: newOrder.orderId,
            user_id: { name: "New User", email: "" },
            total: newOrder.total,
            paymentMethod: newOrder.paymentMethod,
            status: newOrder.status,
            createdAt: newOrder.createdAt,
          },
          ...prev,
        ];
      });
    });

    return () => {
      socket.off("order:new");
    };
  }, []);

  /* ---------------- UPDATE STATUS (ADMIN ACTION) ---------------- */
  async function updateStatus(orderId, status) {
    try {
      setLoadingId(orderId);

      const res = await axiosApiInstance.patch(
        `/order/admin/${orderId}/status`,
        { status }
      );

      if (res.data.flag) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status } : o
          )
        );
      }
    } catch (err) {
      console.error("Update status failed", err);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 w-full">
      <h2 className="text-lg font-semibold mb-4">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600">
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b last:border-0"
              >
                <td className="px-4 py-3 font-medium">
                  #{order._id.slice(-6)}
                </td>

                <td className="px-4 py-3">
                  <div className="font-medium">
                    {order.user_id?.name || "—"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.user_id?.email || ""}
                  </div>
                </td>

                <td className="px-4 py-3 font-semibold">
                  ₹{order.total}
                </td>

                <td className="px-4 py-3">
                  {order.paymentMethod}
                </td>

                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    disabled={loadingId === order._id}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="
                      rounded-md border border-gray-300
                      px-2 py-1 text-sm
                      focus:outline-none focus:ring-1
                      focus:ring-indigo-500
                    "
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
