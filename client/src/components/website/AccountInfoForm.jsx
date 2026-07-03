// components/profile/AccountInfoForm.jsx
"use client";

import { useState } from "react";

export default function AccountInfoForm() {
  const [form, setForm] = useState({
    firstName: "Mark",
    lastName: "Cole",
    email: "swvo@gmail.com",
    phone: "+1 0231 4554 452",
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Saved!");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-8">Account Info</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
          />

          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
          />
        </div>

        {/* Email */}
        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
        />

        {/* Phone */}
        <InputField
          label="Phone Number (Optional)"
          name="phone"
          value={form.phone}
          onChange={onChange}
        />

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium shadow hover:bg-emerald-700"
        >
          SAVE
        </button>
      </form>
    </div>
  );
}

function InputField({ label, name, value, onChange, required, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-200 focus:outline-none"
      />
    </div>
  );
}
