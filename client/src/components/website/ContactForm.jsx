"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    category: "",
    message: "",
    consent: true,
  });

  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name required";
    if (!form.email.trim()) errs.email = "Email required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message required";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      setSuccess("Message sent — we'll get back to you soon.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        company: "",
        category: "",
        message: "",
        consent: true,
      });
    } catch {
      setSuccess("Something went wrong, please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* NAME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="First name" error={errors.firstName}>
          <input
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            placeholder="First name"
            className={inputClass(errors.firstName)}
          />
        </FormField>

        <FormField label="Last name">
          <input
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            placeholder="Last name"
            className={inputClass()}
          />
        </FormField>
      </div>

      {/* EMAIL / PHONE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Email address" error={errors.email}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
        </FormField>

        <FormField label="Phone number">
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+1 (555) 555-5555"
            className={inputClass()}
          />
        </FormField>
      </div>

      {/* COUNTRY / COMPANY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Country / Region">
          <select
            name="country"
            value={form.country}
            onChange={onChange}
            className={inputClass()}
          >
            <option value="">Select country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>India</option>
          </select>
        </FormField>

        <FormField label="Company">
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder="Company name"
            className={inputClass()}
          />
        </FormField>
      </div>

      {/* CATEGORY */}
      <FormField label="Category (optional)">
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          className={inputClass()}
        >
          <option value="">Select category</option>
          <option>General inquiry</option>
          <option>Support</option>
          <option>Partnership</option>
        </select>
      </FormField>

      {/* MESSAGE */}
      <FormField label="Message" error={errors.message}>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          placeholder="Tell us more about your inquiry…"
          className={`${inputClass(errors.message)} resize-none`}
        />
      </FormField>

      {/* CONSENT */}
      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={onChange}
          className="mt-1 h-4 w-4 rounded border-slate-300 focus:ring-2 focus:ring-[#01A49E]/30"
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          I agree to receive occasional emails. You can unsubscribe at any time.
        </label>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={busy}
          className={`
            inline-flex items-center justify-center
            rounded-lg px-5 py-2.5 text-sm font-medium
            transition
            ${
              busy
                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                : "bg-[#01A49E] text-white hover:opacity-90"
            }
          `}
        >
          {busy ? "Sending…" : "Send message"}
        </button>

        {success && (
          <p className="mt-3 text-sm text-emerald-600">
            {success}
          </p>
        )}
      </div>
    </form>
  );
}

/* ---------------- HELPERS ---------------- */

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError) {
  return `
    w-full rounded-lg border
    px-3 py-2.5 text-sm
    focus:outline-none focus:ring-2
    ${
      hasError
        ? "border-red-400 focus:ring-red-200"
        : "border-slate-300 focus:ring-[#01A49E]/30"
    }
  `;
}
