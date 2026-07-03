"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home,Boxes,Package,BarChart3,Settings,User,Layers } from "lucide-react";

export default function Sidebar(){
  const pathname=usePathname();

  const menu=[
    { name:"Dashboard",logo:<Home size={18}/>,src:"/admin" },
    { name:"Category",logo:<Boxes size={18}/>,src:"/admin/category" },
    { name:"Product",logo:<Package size={18}/>,src:"/admin/product" },
    { name:"Brand",logo:<Layers size={18}/>,src:"/admin/brand" },
    { name:"Color",logo:<Package size={18}/>,src:"/admin/color" },
    { name:"User",logo:<User size={18}/>,src:"/admin/user" }
  ];

  const others=[
    { name:"Charts",logo:<BarChart3 size={18}/>,src:"/admin/charts" },
    { name:"Settings",logo:<Settings size={18}/>,src:"/admin/settings" }
  ];

  const renderMenuItem=(item)=>{
    const isActive=pathname===item.src;
    return(
      <Link
        key={item.src}
        href={item.src}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
          ${isActive
            ?"bg-indigo-600 text-white shadow-sm"
            :"text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
          }`}
      >
        {item.logo}
        <span>{item.name}</span>
      </Link>
    );
  };

  return(
    <aside className="w-64 h-screen bg-white border-r border-gray-200 px-4 py-6 flex flex-col">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold">
          TA
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900">IshopAdmin</h1>
          <p className="text-xs text-gray-400">Admin Dashboard</p>
        </div>
      </div>

      <p className="px-2 text-xs font-semibold text-gray-400 tracking-wider mb-3">
        MAIN MENU
      </p>
      <nav className="space-y-1 mb-8">
        {menu.map(renderMenuItem)}
      </nav>

      <p className="px-2 text-xs font-semibold text-gray-400 tracking-wider mb-3">
        OTHERS
      </p>
      <nav className="space-y-1">
        {others.map(renderMenuItem)}
      </nav>

      <div className="mt-auto px-2 pt-6 text-xs text-gray-400">
        © 2025 IshopAdmin
      </div>
    </aside>
  );
}
