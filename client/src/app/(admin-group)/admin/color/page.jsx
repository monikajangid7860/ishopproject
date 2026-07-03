import React from "react";
import { Plus,Pencil,Tag } from "lucide-react";
import Link from "next/link";
import { getColors } from "@/api-calls/color";
import StatusToggleBtn from "@/components/admin/StatusToggleBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function ColorTable(){
  const fetchcolor=await getColors();
  const colors=fetchcolor.colors;

  return(
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-6 py-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Color Management</h2>
          <p className="text-sm text-gray-500">Manage product color options</p>
        </div>
        <Link href="/admin/color/add">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16}/>Add Color
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Color</th>
              <th className="px-6 py-3 text-left font-medium">Preview</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {colors.map((color,index)=>(
              <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Tag size={15} className="text-gray-400"/>
                    <span className="font-medium text-gray-900">{color.name}</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div style={{background:color.code}} className="w-20 h-8 rounded-full border border-gray-300 shadow-sm"></div>
                    <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">{color.code}</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <StatusToggleBtn url={`color/status/${color._id}`} flag="1" status={color.status} label="status"/>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/color/edit/${color._id}`}>
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Pencil size={16}/>
                      </button>
                    </Link>
                    <DeleteBtn id={color._id} slug="color"/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
