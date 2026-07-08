"use client";

import { axiosApiInstance, slugGenerator, notify } from "@/helper/helper";
import { useEffect, useState } from "react";
import { getBrands } from "@/api-calls/brand";
import { getColors } from "@/api-calls/color";
import { getCategories } from "@/api-calls/category";
import Select from "react-select";
import FileUpload from "@/components/common/FileUpload";
import { Editor } from "primereact/editor";

const ProductEdit = ({ productId }) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    original_price: "",
    final_price: "",
    discount_percentage: "",
  });

  const [description, setDescription] = useState("");

  const [mainImage, setMainImage] = useState(null);

  // ✅ Current image from Cloudinary
  const [currentImage, setCurrentImage] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [colorData, setColorData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [colorIds, setColorIds] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchDropdownData = async () => {
    const categoryJSON = await getCategories();
    const brandJSON = await getBrands();
    const colorJSON = await getColors();

    setCategoryData(categoryJSON.categories || []);
    setBrandData(brandJSON.brands || []);
    setColorData(colorJSON.colors || []);
  };

  const fetchProduct = async () => {
    try {
      const res = await axiosApiInstance.get(`product/${productId}`);

      if (res.data.flag !== 1) {
        notify("Product not found", 0);
        return;
      }

      const p = res.data.product;

      setForm({
        name: p.name,
        slug: p.slug,
        original_price: p.original_price,
        final_price: p.final_price,
        discount_percentage: p.discount_percentage,
      });

      setDescription(p.description || "");

      // ✅ Cloudinary image
      setCurrentImage(p.thumbnail?.url || "");

      setSelectedCategory({
        value: p.category_id._id,
        label: p.category_id.name,
      });

      setSelectedBrand({
        value: p.brand_id._id,
        label: p.brand_id.name,
      });

      const colors = p.color_ids.map((c) => ({
        value: c._id,
        label: c.name,
      }));

      setSelectedColors(colors);
      setColorIds(colors.map((c) => c.value));
    } catch (err) {
      console.error(err);
      notify("Failed to load product", 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownData();
    fetchProduct();
  }, [productId]);

  const handleNameChange = (e) => {
    const name = e.target.value;

    setForm({
      ...form,
      name,
      slug: slugGenerator(name),
    });
  };

  const handlePriceChange = (key, value) => {
    const updated = {
      ...form,
      [key]: value,
    };

    const op = Number(updated.original_price);
    const fp = Number(updated.final_price);

    if (op && fp && fp <= op) {
      updated.discount_percentage = (
        100 -
        (fp / op) * 100
      ).toFixed(2);
    } else {
      updated.discount_percentage = "";
    }

    setForm(updated);
  };

  const colorChangeHandler = (options) => {
    setSelectedColors(options || []);
    setColorIds((options || []).map((o) => o.value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("original_price", form.original_price);
    formData.append("final_price", form.final_price);
    formData.append(
      "discount_percentage",
      form.discount_percentage
    );
    formData.append("description", description);

    if (selectedCategory?.value) {
      formData.append("category_id", selectedCategory.value);
    }

    if (selectedBrand?.value) {
      formData.append("brand_id", selectedBrand.value);
    }

    if (colorIds.length) {
      formData.append("color_ids", JSON.stringify(colorIds));
    }

    // Upload only if a new image was selected
    if (mainImage?.file) {
      formData.append("thumbnail", mainImage.file);
    }

    try {
      const res = await axiosApiInstance.put(
        `product/update/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.flag === 1) {
        notify("Product updated successfully", 1);

        // Refresh product so latest image appears
        fetchProduct();

        setMainImage(null);
      } else {
        notify(res.data.message || "Update failed", 0);
      }
    } catch (err) {
      console.error(err);
      notify("Error updating product", 0);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-7xl">
        <p className="text-sm text-gray-500">
          Loading product details...
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Edit Product
        </h1>

        <p className="text-sm text-gray-500">
          Update product details and pricing
        </p>
      </header>

      <form onSubmit={submitHandler} className="space-y-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-2 gap-5">
            <input
              value={form.name}
              onChange={handleNameChange}
              className="admin-input"
            />

            <input
              value={form.slug}
              readOnly
              className="admin-input bg-gray-50"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Pricing
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <input
              type="number"
              value={form.original_price}
              onChange={(e) =>
                handlePriceChange(
                  "original_price",
                  e.target.value
                )
              }
              className="admin-input"
            />

            <input
              type="number"
              value={form.final_price}
              onChange={(e) =>
                handlePriceChange(
                  "final_price",
                  e.target.value
                )
              }
              className="admin-input"
            />

            <input
              value={form.discount_percentage}
              readOnly
              className="admin-input bg-gray-50"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Attributes
          </h3>

          <div className="grid grid-cols-3 gap-5">
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categoryData.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
            />

            <Select
              isMulti
              value={selectedColors}
              onChange={colorChangeHandler}
              options={colorData.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
            />

            <Select
              value={selectedBrand}
              onChange={setSelectedBrand}
              options={brandData.map((b) => ({
                value: b._id,
                label: b.name,
              }))}
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Description
          </h3>

          <Editor
            value={description}
            onTextChange={(e) => setDescription(e.htmlValue)}
            style={{ height: 180 }}
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Thumbnail
          </h3>

          {currentImage && (
            <div className="mb-5">
              <img
                src={currentImage}
                alt={form.name}
                className="w-36 h-36 object-contain rounded-lg border bg-white p-2"
              />
            </div>
          )}

          <FileUpload
            onFilesChange={(files) => setMainImage(files[0])}
            maxFiles={1}
          />

          <p className="text-xs text-gray-500 mt-3">
            Leave empty to keep the existing thumbnail.
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg"
          >
            Update Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductEdit;