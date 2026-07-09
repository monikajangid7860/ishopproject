import React from "react";
import { Plus,Pencil,ImageIcon,Tag } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/api-calls/category";
import StatusToggleBtn from "@/components/admin/StatusToggleBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { getCategoryImage } from "@/helper/getCategoryImage";

export default async function CategoryTable(){
  const categoryJSON=await getCategories();
  const categories=categoryJSON.categories;

  return(
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-6 py-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Category Management</h2>
          <p className="text-sm text-gray-500">Organize products by category</p>
        </div>
        <Link href="/admin/category/add">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16}/>Add Category
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Category</th>
              <th className="px-6 py-3 text-left font-medium">Slug</th>
              <th className="px-6 py-3 text-left font-medium">Visibility</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat,index)=>(
              <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
              {cat.image ? (
  <img
    src={getCategoryImage(cat, categoryJSON.imageUrl)}
    alt={cat.name}
    className="w-full h-full object-contain p-1"
  />
) : (
  <ImageIcon size={26} className="text-gray-400" />
)}:(
                        <ImageIcon size={26} className="text-gray-400"/>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-gray-400"/>
                        <span className="font-semibold text-gray-900">{cat.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">Category</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-500">{cat.slug}</td>

                <td className="px-6 py-5">
                  <div className="inline-flex flex-wrap gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <StatusToggleBtn url={`category/status/${cat._id}`} id={cat._id} flag="1" status={cat.status} label="status"/>
                    <StatusToggleBtn url={`category/status/${cat._id}`} id={cat._id} flag="2" status={cat.on_home} label="on_home"/>
                    <StatusToggleBtn url={`category/status/${cat._id}`} id={cat._id} flag="3" status={cat.is_top} label="is_top"/>
                    <StatusToggleBtn url={`category/status/${cat._id}`} id={cat._id} flag="4" status={cat.is_best} label="is_best"/>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/category/edit/${cat._id}`}>
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Pencil size={16}/>
                      </button>
                    </Link>
                    <DeleteBtn id={cat._id} slug={"category"}/>
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
