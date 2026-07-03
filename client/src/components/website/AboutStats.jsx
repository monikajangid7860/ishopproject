// components/about/AboutStats.jsx

export default function AboutStats() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 md:p-10">

      <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-6">
        OUR PURPOSE IS TO <span className="text-emerald-600">ENRICH</span>  
        & <span className="text-emerald-600">ENHANCE LIVES</span> THROUGH TECHNOLOGY
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Revenue */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">$12,5M</h2>
          <p className="text-xs text-slate-500 mt-1">
            TOTAL REVENUE FROM<br />2001 - 2023
          </p>
        </div>

        {/* Orders */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">12K+</h2>
          <p className="text-xs text-slate-500 mt-1">
            ORDERS DELIVERED<br />SUCCESSFULLY EVERYDAY
          </p>
        </div>

        {/* Stores */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">725+</h2>
          <p className="text-xs text-slate-500 mt-1">
            STORE AND OFFICE IN U.S<br />AND WORLDWIDE
          </p>
        </div>

      </div>
    </section>
  );
}
