"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosApiInstance } from "@/helper/helper";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axiosApiInstance.post(
        "/admin/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.flag === 1) {
        router.replace("/admin");
      }
    } catch (err) {
      alert("Invalid admin credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-[350px]"
      >
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
