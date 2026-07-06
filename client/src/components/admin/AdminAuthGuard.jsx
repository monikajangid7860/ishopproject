"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosApiInstance } from "@/helper/helper";

export default function AdminAuthGuard({ children }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAdmin() {
      try {
        const res = await axiosApiInstance.get("/admin/auth/me", {
          withCredentials: true,
        });

        if (!mounted) return;

        if (res.data.flag === 1) {
          setAuthorized(true);
        } else {
          window.location.href = "/admin/login";
        }
      } catch (err) {
        window.location.href = "/admin";
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-black animate-spin" />
          <p className="text-gray-500 text-sm">
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