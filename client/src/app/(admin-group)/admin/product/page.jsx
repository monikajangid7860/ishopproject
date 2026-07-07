import React from "react";
import { Plus, Pencil, ImageIcon, Tag } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/api-calls/products";
import StatusToggleBtn from "@/components/admin/StatusToggleBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import MultiImageSelector from "@/components/admin/MultiImageSelector";
import { getThumbnail } from "@/helper/getProductImage";
export default async function ProductTable() {
  const productJSON = await getProducts();
  const products = productJSON.products;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-6 py-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Product Management
          </h2>
          <p className="text-sm text-gray-500">
            Manage products, pricing, and visibility
          </p>
        </div>
        <Link href="/admin/product/add">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            <Plus size={16} />
            Add Product
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700">
              <th className="px-6 py-3 text-left font-medium">Product</th>
              <th className="px-6 py-3 text-left font-medium">Pricing</th>
              <th className="px-6 py-3 text-left font-medium">Belongs To</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden flex items-center justify-center">
                      {prod.thumbnail ? (
<img
  src={getThumbnail(prod, productJSON.imageUrl)}
  alt={prod.name}
  className="w-full h-full object-cover"
/>
                      ) : (
                        <ImageIcon size={26} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-gray-400" />
                        <span className="font-semibold text-gray-900">
                          {prod.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{prod.slug}</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="text-sm">
                    <del className="text-gray-400">₹{prod.original_price}</del>
                    <span className="ml-2 text-xs text-red-500">
                      {prod.discount_percentage}% off
                    </span>
                    <div className="font-semibold text-green-600">
                      ₹{prod.final_price}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-gray-600">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {prod.category_id?.name}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Brand:</span>{" "}
                    {prod.brand_id?.name}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {prod.color_ids?.map((color) => (
                      <span
                        key={color._id}
                        title={color.name}
                        style={{ background: color.code }}
                        className="w-5 h-5 rounded-full border border-gray-300"
                      ></span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="1"
                      status={prod.status}
                      label="status"
                    />
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="2"
                      status={prod.show_home}
                      label="on_home"
                    />
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="3"
                      status={prod.is_featured}
                      label="is_featured"
                    />
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="4"
                      status={prod.is_best_seller}
                      label="is_best"
                    />
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="5"
                      status={prod.is_hot}
                      label="is_hot"
                    />
                    <StatusToggleBtn
                      url={`product/status/${prod._id}`}
                      flag="6"
                      status={prod.stock}
                      label="stock"
                    />
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <MultiImageSelector
                      api_url="/product/add-other-images"
                      product_id={prod._id}
                      other_images={prod.other_images}
                    />
                    <Link href={`/admin/product/edit/${prod._id}`}>
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Pencil size={16} />
                      </button>
                    </Link>
                    <DeleteBtn id={prod._id} slug={"product"} />
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
