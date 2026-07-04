"use client";
import React, { useState } from "react";
import { Images, X, Trash, ZoomIn } from "lucide-react";
import FileUpload from "@/components/common/FileUpload";
import { axiosApiInstance, notify } from "@/helper/helper";

function MultiImageSelector({ product_id, api_url, other_images }) {
  const [otherImages, setotherImages] = useState(other_images);
  const [toggle, setToggle] = useState(false);
  const [zoomImg, setZoomImg] = useState(null);
  const [image_files, setimage_files] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // =====================================
  // 📤 UPLOAD
  // =====================================
  const uploadHandler = async () => {
    if (image_files.length == 0) {
      return notify("Please select images", "error");
    }

    setIsUploading(true);

    const formData = new FormData();
    image_files.forEach((img) => formData.append("other_images", img));
    formData.append("product_id", product_id);

    axiosApiInstance
      .post(api_url, formData)
      .then((response) => {
        const updated = response.data.updated_other_images || [];
        if (Array.isArray(updated)) {
          setotherImages(updated);
        }

        notify("Images uploaded successfully!", 1); // ✔️ Green
        setimage_files([]);
      })
      .catch((error) => {
        console.log(error);
        notify("Upload failed!", 0); // ✔️ Red
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  // =====================================
  // 🗑️ DELETE
  // =====================================
  const deleteHandler = (index) => {
    axiosApiInstance
      .delete(`/product/delete-other-image/${product_id}/${index}`)
      .then((response) => {
        const updated = response.data.updated_other_images || [];
        if (Array.isArray(updated)) {
          setotherImages(updated);
        }

        notify("Image deleted successfully!", 1); // ✔️ Green
      })
      .catch((error) => {
        console.log(error);
        notify("Failed to delete!", 0); // ✔️ Red
      });
  };

  // =====================================
  // 📂 FILE CHANGE
  // =====================================
  const filechangeHandler = (images) => {
    const files = images.map((img) => img.file);
    setimage_files(files);
  };

  return (
    <>
      {/* Trigger Icon */}
      <Images onClick={() => setToggle(true)} className="cursor-pointer" />

      {/* ------------------------ MODAL ------------------------ */}
      {toggle && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
          onClick={() => setToggle(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[760px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <X
              className="absolute top-3 right-3 cursor-pointer hover:text-red-500"
              onClick={() => setToggle(false)}
            />

            <h2 className="text-xl font-semibold mb-5 border-b pb-2">
              Manage Product Images
            </h2>
            {/* Thumbnails */}
            {otherImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 max-h-[260px] overflow-y-auto pr-2 mb-6">
                {otherImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg group cursor-pointer"
                    onClick={() =>
                      setZoomImg(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/other_images/${img}`
                      )
                    }
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/other_images/${img}`}
                      className="w-full h-[120px] object-cover rounded-lg group-hover:opacity-80"
                    />

                    {/* delete */}
                    <button
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-[4px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(index);
                      }}
                    >
                      <Trash size={16} />
                    </button>

                    {/* zoom */}
                    <ZoomIn
                      size={16}
                      className="absolute bottom-2 right-2 text-white opacity-80"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-6">No images uploaded yet.</p>
            )}

            {/* File Upload */}
            <FileUpload
              key={otherImages.length}
              onFilesChange={filechangeHandler}
              multiple={true}
              maxSize={2 * 1024 * 1024}
              className="my-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setToggle(false)}
                className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={uploadHandler}
                disabled={isUploading}
                className={`px-3 py-2 rounded text-white ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------ ZOOM PREVIEW ------------------------ */}
      {zoomImg && (
        <div
          className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center"
          onClick={() => setZoomImg(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomImg}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
            <X
              className="absolute top-6 right-6 text-white cursor-pointer"
              onClick={() => setZoomImg(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MultiImageSelector;
