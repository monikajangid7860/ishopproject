"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosApiInstance } from "@/helper/helper";

export default function AdminAuthGuard({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      console.log("🔒 Checking admin authentication...");

      try {
        const res = await axiosApiInstance.get("/admin/auth/me", {
          withCredentials: true,
        });

        console.log("✅ /admin/auth/me", res.data);

        if (cancelled) return;

        if (res.data.flag === 1) {
          setAuthorized(true);
          setLoading(false);
        } else {
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("❌ Admin auth failed:", err?.response?.status);
        console.error(err?.response?.data);

        if (!cancelled) {
          router.replace("/admin/login");
        }
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
          <p className="text-sm text-gray-500">
            Verifying administrator...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return children;
}