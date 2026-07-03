import Link from "next/link";

export default async function OrderSuccess({ searchParams }) {
  const orderId = await searchParams;
  console.log(orderId)
  const Id = orderId.id;

  return (
    <section className="bg-gray-50 min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          
          {/* ICON */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-7 w-7 text-emerald-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Order placed successfully
          </h1>

          {/* MESSAGE */}
          <p className="mt-3 text-gray-600">
            Thank you for your purchase. We’ve received your order and will start
            processing it right away.
          </p>

          {/* ORDER ID */}
          {orderId && (
            <div className="mt-4 text-sm text-gray-500">
              Order ID:&nbsp;
              <span className="font-medium text-gray-900">
                {Id}
              </span>
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/my-orders"
              className="
                inline-flex items-center justify-center
                rounded-lg bg-[#01A49E] px-6 py-3
                text-sm font-medium text-white
                hover:opacity-90
              "
            >
              View My Orders
            </Link>

            <Link
              href="/store"
              className="
                inline-flex items-center justify-center
                rounded-lg border border-gray-300
                px-6 py-3 text-sm font-medium
                text-gray-700 hover:bg-gray-100
              "
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
