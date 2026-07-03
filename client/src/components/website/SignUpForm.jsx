"use client";

import { useState } from "react";
import Link from "next/link";
import { axiosApiInstance } from "@/helper/helper";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      setLoading(true);
      const res = await axiosApiInstance.post("/user/register", data);

      if (res.data.flag === 1) {
        setSuccess(res.data.message || "Registered successfully");
        e.target.reset();
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Register to continue
        </p>
      </div>

      <form className="space-y-5" onSubmit={submitHandler}>
        {/* NAME */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="
              w-full rounded-lg border border-gray-300
              px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-emerald-500/30
            "
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Email address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="
              w-full rounded-lg border border-gray-300
              px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-emerald-500/30
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="
              w-full rounded-lg border border-gray-300
              px-3 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-emerald-500/30
            "
          />
        </div>

        {/* FEEDBACK */}
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {success}
          </div>
        )}

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full rounded-lg py-3 text-sm font-medium
            text-white transition
            ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }
          `}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        {/* FOOTER */}
        <p className="pt-2 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
