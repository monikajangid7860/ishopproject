// components/about/CompanyTimeline.jsx

export default function CompanyTimeline() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 md:p-10 space-y-10">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-slate-800 uppercase">
        FROM A RETAIL STORE TO THE GLOBAL CHAIN OF STORES
      </h2>

      {/* Story */}
      <div className="text-sm text-slate-600 leading-relaxed space-y-4">

        <p>
          SwatoTech Mart started from a humble local store. Determined to deliver
          high-quality products at affordable rates, the founders began with one
          mission: to revolutionize retail through transparency & technology.
        </p>

        <p>
          As demand grew, we expanded into multiple locations, then moved online,
          enabling customers across regions to access premium products effortlessly.
          With a strong delivery system and customer-centric philosophy, our brand
          quickly reached national attention.
        </p>

        <p>
          Now, SwatoTech Mart stands as a thriving blend of offline & online
          business, recognized for fast delivery, secure transactions, and unmatched
          customer satisfaction.
        </p>

      </div>

      {/* Timeline – two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left column */}
        <div className="text-sm text-slate-700 space-y-3">
          <p><b>2001</b> — First local retail store opened.</p>
          <p><b>2005</b> — Brand expanded to 10+ regional stores.</p>
          <p><b>2008</b> — Introduced mobile store experience.</p>
          <p><b>2012</b> — Cross-border supply chain established.</p>
        </div>

        {/* Right column */}
        <div className="text-sm text-slate-700 space-y-3">
          <p><b>2014</b> — Online platform officially launched.</p>
          <p><b>2017</b> — Achieved 1 million online customers.</p>
          <p><b>2020</b> — Fully automated delivery system activated.</p>
          <p><b>2023</b> — Expanded to 725+ stores & offices globally.</p>
        </div>

      </div>

      {/* Footer Year */}
      <p className="text-sm text-slate-500 pt-3">2024 — Still growing strong</p>
    </section>
  );
}
