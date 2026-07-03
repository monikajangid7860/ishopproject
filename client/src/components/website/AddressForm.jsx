"use client";

import { useEffect, useState } from "react";

export default function AddressForm({
  onSubmit,
  onClose,
  initialData = null,
}) {
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    contact: "",
  });

  /* ---------------- PREFILL FOR EDIT ---------------- */
  useEffect(() => {
    if (initialData) {
      setAddress({
        addressLine1: initialData.addressLine1 || "",
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        postalCode: initialData.postalCode || "",
        country: initialData.country || "India",
        contact: initialData.contact || "",
      });
    }
  }, [initialData]);

  /* ---------------- ESC KEY CLOSE ---------------- */
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ---------------- CHANGE HANDLER ---------------- */
  function handleChange(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    await onSubmit?.(address);
    setLoading(false);
  }

  return (
    <div
      className="
        fixed inset-0
        z-[9999]
        bg-black/50
        flex items-center justify-center
        px-4
      "
      onClick={() => onClose?.()}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="
          w-full max-w-lg
          bg-white rounded-xl
          shadow-2xl
          max-h-[90vh]
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Address" : "Add New Address"}
          </h2>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="
              w-8 h-8 flex items-center justify-center
              rounded-full
              text-gray-500 hover:text-gray-800
              hover:bg-gray-100
            "
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="px-6 py-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Address Line 1
            </label>
            <input
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              required
              placeholder="House no, street name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Address Line 2
            </label>
            <input
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, landmark (optional)"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                City
              </label>
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                State
              </label>
              <input
                name="state"
                value={address.state}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Postal Code
              </label>
              <input
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Country
              </label>
              <input
                name="country"
                value={address.country}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              name="contact"
              value={address.contact}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#01A49E]/30"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full rounded-lg py-3 text-sm font-medium
              ${
                loading
                  ? "bg-gray-300 text-gray-600"
                  : "bg-[#01A49E] text-white hover:opacity-90"
              }
            `}
          >
            {loading
              ? "Saving..."
              : initialData
              ? "Update Address"
              : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
