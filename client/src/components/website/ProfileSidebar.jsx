// components/profile/ProfileSidebar.jsx
import { ChevronRight } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <aside className="bg-white rounded-xl shadow-sm p-6 text-center">
      
      {/* Avatar */}
      <div className="flex justify-center">
        <img
          src="/mnt/data/631c538f-8c80-4c1f-9998-e6321547e79c.png"
          alt="avatar"
          className="w-24 h-24 rounded-lg object-cover"
        />
      </div>

      {/* Name & Email */}
      <h2 className="mt-4 text-lg font-semibold text-slate-800">Mark Cole</h2>
      <p className="text-sm text-slate-500">swvo@gmail.com</p>

      {/* Menu */}
      <div className="mt-6 space-y-2 text-left">
        <SidebarItem active label="Account info" />
        <SidebarItem label="My order" />
        <SidebarItem label="My address" />
        <SidebarItem label="Change password" />
      </div>
    </aside>
  );
}

function SidebarItem({ label, active }) {
  return (
    <button
      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border text-sm transition
        ${
          active
            ? "bg-emerald-600 text-white border-emerald-600"
            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
        }
      `}
    >
      {label}
      <ChevronRight
        size={18}
        className={active ? "text-white" : "text-slate-600"}
      />
    </button>
  );
}
