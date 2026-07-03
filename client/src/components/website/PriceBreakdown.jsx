export default function PriceBreakdown() {
  return (
    <div className="bg-gray-50 rounded-2xl border p-6">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>₹1999</span>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <span>Delivery</span>
        <span className="text-green-600">FREE</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₹1999</span>
      </div>
    </div>
  );
}
