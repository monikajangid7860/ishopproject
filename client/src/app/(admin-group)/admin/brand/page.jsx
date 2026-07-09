import React from "react";
import { Plus,Pencil,ImageIcon,Tag } from "lucide-react";
import Link from "next/link";
import { getBrands } from "@/api-calls/brand";
import StatusToggleBtn from "@/components/admin/StatusToggleBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { getBrandImage } from "@/helper/getBrandImage";
export default async function BrandTable(){
  const brandJSON = await getBrands();
const brands = brandJSON?.brands ?? [];

  return(
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-6 py-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Brand Management</h2>
          <p className="text-sm text-gray-500">Control brand visibility across the store</p>
        </div>
        <Link href="/admin/brand/add">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16}/>Add Brand
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Brand</th>
              <th className="px-6 py-3 text-left font-medium">Slug</th>
              <th className="px-6 py-3 text-left font-medium">Visibility</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand,index)=>(
              <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm flex items-center justify-center overflow-hidden">
                      {brand.image ? (
  <img
    src={getBrandImage(brand, brandJSON.imageUrl)}
    alt={brand.name}
    className="w-full h-full object-contain p-1"
  />
) : (
  <ImageIcon size={26} className="text-gray-400" />
)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-gray-400"/>
                        <span className="font-semibold text-gray-900">{brand.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">Brand Logo</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-gray-500">{brand.slug}</td>

                <td className="px-6 py-5">
                  <div className="inline-flex flex-wrap gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <StatusToggleBtn url={`brand/status/${brand._id}`} id={brand._id} flag="1" status={brand.status} label="status"/>
                    <StatusToggleBtn url={`brand/status/${brand._id}`} id={brand._id} flag="2" status={brand.on_home} label="on_home"/>
                    <StatusToggleBtn url={`brand/status/${brand._id}`} id={brand._id} flag="3" status={brand.is_top} label="is_top"/>
                    <StatusToggleBtn url={`brand/status/${brand._id}`} id={brand._id} flag="4" status={brand.is_best} label="is_best"/>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <Link href={`/admin/brand/edit/${brand._id}`}>
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Pencil size={16}/>
                      </button>
                    </Link>
                    <DeleteBtn id={brand._id} slug={"brand"}/>
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
