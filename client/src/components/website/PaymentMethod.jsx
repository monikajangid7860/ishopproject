export default function PaymentMethod({ value, onChange }) {
  return (
    <div className="bg-white border rounded-xl p-5 space-y-3">
      <h2 className="text-lg font-semibold">Payment Method</h2>

      {/* COD */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="COD"
          checked={value === "COD"}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="text-sm">Cash on Delivery</span>
      </label>

      {/* ONLINE */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value="ONLINE"
          checked={value === "ONLINE"}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="text-sm">Online Payment</span>
      </label>
    </div>
  );
}
