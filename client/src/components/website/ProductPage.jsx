import ProductGallery from "./ProductGallery.jsx";
import ProductOptions from "./ProductOptions.jsx";
import PurchaseBox from "./PurchaseBox.jsx";
import Badge from "./ProductBadge.jsx";

/**
 * Server component – layout only
 * Expects a NORMALIZED product object
 */
export default function ProductPage({ product }) {
  console.log(product)
  return (
    <section
      aria-label="Product detail"
      className="max-w-7xl mx-auto px-4 py-6"
    >
      <div
        className="
          grid grid-cols-1 lg:grid-cols-12 gap-8
          bg-white rounded-xl
          border border-slate-200
          p-5 lg:p-8
        "
      >
        {/* ================= LEFT : GALLERY ================= */}
        <div className="lg:col-span-5">
          <ProductGallery images={product.other_images} />
        </div>

        {/* ================= CENTER : PRODUCT INFO ================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* TITLE & BADGE */}
          <div>
            {product.discount_percentage > 0 && (
              <div className="mb-2">
                <Badge text="SALE" tone="black" />
              </div>
            )}

            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">
              {product.title}
            </h1>

            {product.subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* PRICE */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">
                ₹{product.price}
              </span>

              {product.original_price && (
                <span className="text-sm text-slate-500 line-through">
                  ₹{product.original_price}
                </span>
              )}
            </div>

            {product.discount_percentage && (
              <p className="text-sm font-medium text-emerald-600">
                {product.discount_percentage}% off
              </p>
            )}
          </div>

          {/* TRUST SIGNALS */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="px-3 py-1 rounded-full border">
              Free shipping
            </span>
            <span className="px-3 py-1 rounded-full border">
              30-day returns
            </span>
            <span className="px-3 py-1 rounded-full border">
              Secure checkout
            </span>
          </div>

          {/* OPTIONS */}
          <ProductOptions product={product} />

          {/* HIGHLIGHTS (TEMPORARY / MARKETING SAFE) */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">
              Why you’ll love it
            </h3>

            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Premium build quality</li>
              <li>• Optimized for everyday performance</li>
              <li>• Backed by trusted brand support</li>
            </ul>
          </div>

          {/* META */}
          <div className="pt-4 border-t text-sm text-slate-600 space-y-1">
            <div>
              SKU:{" "}
              <span className="font-medium text-slate-800">
                {product.sku}
              </span>
            </div>

            {product.brand && (
              <div>
                Brand:{" "}
                <span className="font-medium text-slate-800">
                  {product.brand}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT : PURCHASE ================= */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <PurchaseBox product={product} />
          </div>
        </aside>
      </div>
    </section>
  );
}
