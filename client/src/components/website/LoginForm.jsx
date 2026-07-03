"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { axiosApiInstance, notify } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/reducer/UserReducer";

export default function LoginForm() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const res = await axiosApiInstance.post("/user/login", data);

      if (res.data.flag === 1) {
        const { user } = res.data;

        notify("Login Successful", 1);

        // ✅ SAVE USER IN REDUX (SESSION AUTH)
        dispatch(setUser(user));

        /* ================= CART MERGE ================= */
        const guestCart =
          JSON.parse(localStorage.getItem("cart")) || [];

        if (guestCart.length > 0) {
          await axiosApiInstance.post("/cart/sync-cart", {
            cart_data: guestCart,
            source: "guest",
          });

          localStorage.removeItem("cart");
        }

        /* ================= WISHLIST MERGE ================= */
        const guestWish =
          JSON.parse(localStorage.getItem("wish")) || [];

        if (guestWish.length > 0) {
          await axiosApiInstance.post("/wishlist/merge", {
            items: guestWish.map((i) => ({
              product_id: i.id,
            })),
          });

          localStorage.removeItem("wish");
        }

        // 🔥 REDIRECT
        router.push("/");
      } else {
        notify(res.data.msg || "Login failed", 0);
      }
    } catch (err) {
      
      notify("Something went wrong", 0);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-emerald-600 mb-1">
        Welcome Back
      </h1>
      <p className="text-xs text-slate-500 tracking-wide mb-8">
        LOGIN TO CONTINUE
      </p>

      <form onSubmit={submitHandler} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="Example@gmail.com"
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Password
          </label>

          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Link
            href="/forgot-password"
            className="block mt-2 text-xs text-emerald-600 hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full md:w-40 bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold text-sm py-2 rounded-md shadow-sm"
        >
          LOGIN
        </button>

        <div className="pt-2 text-xs">
          <span className="text-slate-500">NEW USER? </span>
          <Link
            href="/signup"
            className="text-emerald-600 font-semibold hover:underline"
          >
            SIGN UP
          </Link>
        </div>
      </form>
    </div>
  );
}
