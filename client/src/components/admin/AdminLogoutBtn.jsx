"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutBtn() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("http://localhost:5000/admin/auth/logout", {
        method: "POST",
        credentials: "include", // 🔥 REQUIRED
      });

      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="
        px-3 py-1.5 text-sm font-medium
        rounded-lg border border-gray-200
        text-gray-700 hover:bg-gray-100
      "
    >
      Logout
    </button>
  );
}
