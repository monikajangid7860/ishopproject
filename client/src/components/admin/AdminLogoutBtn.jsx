"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutBtn() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      router.replace("/admin/login");
      router.refresh(); // Refresh server components after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="
        px-3 py-1.5
        text-sm
        font-medium
        rounded-lg
        border
        border-gray-200
        text-gray-700
        hover:bg-gray-100
      "
    >
      Logout
    </button>
  );
}