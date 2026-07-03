// components/about/AboutMission.jsx

export default function AboutMission() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Left Image */}
      <div className="bg-emerald-500 rounded-xl overflow-hidden">
        <img
          src="/images/aboutmission.jpg"
          alt="Delivery staff"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Card */}
      <div className="bg-slate-100 rounded-xl p-6 md:p-10 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 leading-snug">
          We connect millions of buyers and sellers around the world, empowering people &
          creating economic opportunity for all.
        </h3>

        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          Within our markets, millions of people around the world connect, both online
          and offline, to make, sell and buy unique goods. We also offer a wide
          range of Seller services and tools that help creative entrepreneurs start,
          manage & scale their business.
        </p>

        <button
          className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition"
        >
          OUR SHOWREEL
        </button>
      </div>

    </section>
  );
}
