
import React from "react";
import { Bell, Search } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLogoutBtn from "./AdminLogoutBtn";
import BellIcon from "./BellIcon";



// async function checkAdmin() {
//   try {
//     const cookieStore = await cookies();

//     console.log("NEXT COOKIES:", cookieStore.getAll()); // 👈 add this

//     const cookieHeader = cookieStore
//       .getAll()
//       .map((c) => `${c.name}=${c.value}`)
//       .join("; ");

//     const res = await fetch("http://localhost:5000/admin/auth/me", {
//       headers: {
//         Cookie: cookieHeader,
//       },
//       cache: "no-store",
//     });
//        console.log("ADMIN CHECK RESPONSE:", res); // 👈 add this
//     return res.ok;
//   } catch (err) {
//     console.error("CHECK ADMIN ERROR:", err);
//     return false;
//   }
// }
export default async function Header() {
  
 

  //  const isAuth = await checkAdmin();
  //  console.log("isAuth" ,isAuth)

  // if (!isAuth) {
  //   redirect("/admin/login");
  // }



  

  

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Welcome back, Admin
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>

        <BellIcon />

          {/* 🔥 LOGOUT */}
          <AdminLogoutBtn />
        </div>
      </div>
    </header>
  );
}
