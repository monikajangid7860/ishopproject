"use client";

import { useEffect, useState, useCallback } from "react";
import { axiosApiInstance } from "@/helper/helper";
import { initAdminSocket } from "@/socket/adminSocket";
import { Bell } from "lucide-react";

export default function BellIcon() {
  const [count, setCount] = useState(0);

  const fetchCount = useCallback(async () => {
    try {
      const res = await axiosApiInstance.get("/admin/notifications");

      if (res.data.flag) {
        setCount(res.data.unreadCount);
      }
    } catch (err) {
      console.error("Failed to fetch admin notifications:", err);
    }
  }, []);

  useEffect(() => {
    fetchCount();

    const socket = initAdminSocket();

    const handleNewOrder = () => {
      fetchCount(); // 🔥 refetch instead of increment
    };

    socket.on("order:new", handleNewOrder);

    return () => {
      socket.off("order:new", handleNewOrder);
      // ❌ do NOT disconnect here
    };
  }, [fetchCount]);

  return (
    <button className="relative">
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}