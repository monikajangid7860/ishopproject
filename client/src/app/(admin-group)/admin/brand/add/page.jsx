'use client';

import { axiosApiInstance, slugGenerator, notify } from "@/helper/helper";
import { useRef } from "react";

const AddBrandForm = () => {
  const brandRef = useRef();
  const slugRef = useRef();

  function createSlug() {
    const slug = slugGenerator(brandRef.current.value);
    slugRef.current.value = slug;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
const file = event.target.image.files[0];

if (!file) {
  return notify("Please select a brand image", 0);
}

formData.append("image", file);
    formData.append("name", brandRef.current.value);
    formData.append("slug", slugRef.current.value);

    try {
      const response = await axiosApiInstance.post("brand/create", formData);
      notify(response.data.msg, response.data.flag);

      if (response.data.flag === 1) {
        brandRef.current.value = "";
        slugRef.current.value = "";
        event.target.reset();
      }
    } catch {
      notify("Internal Server Error", 0);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl w-full">
      
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Add New Brand
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Create a new brand to use in products and filters
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submitHandler} className="p-6 space-y-6">

        {/* Brand Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            ref={brandRef}
            onChange={createSlug}
            placeholder="e.g. Apple, Samsung"
            className="
              w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
            required
          />
        </div>

        {/* Brand Slug */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Brand Slug
          </label>
          <input
            type="text"
            ref={slugRef}
            readOnly
            className="
              w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm
              text-gray-600 cursor-not-allowed
            "
          />
          <p className="text-xs text-gray-400">
            Auto-generated from brand name
          </p>
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Brand Image
          </label>
          <input
            type="file"
            name="image"
            className="
              w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
              file:mr-4 file:rounded-md file:border-0
              file:bg-blue-50 file:px-3 file:py-1
              file:text-blue-700 hover:file:bg-blue-100
            "
            required
          />
        </div>

        {/* Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="
              w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white
              hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            Save Brand
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBrandForm;
