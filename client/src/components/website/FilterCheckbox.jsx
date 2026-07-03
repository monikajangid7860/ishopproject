"use client";

// Small reusable checkbox with count
export default function FilterCheckbox({
  id,
  label,
  count,
  checked = false,
  onChange,
  value,
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 py-2 cursor-pointer select-none"
    >
      <input
        id={id}
        value={value}
        type="checkbox"
        checked={checked}
        onChange={onChange}   // ✅ FIX HERE
        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
      />
      <span className="text-xs text-slate-700 flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-slate-400">({count})</span>
      )}
    </label>
  );
}
