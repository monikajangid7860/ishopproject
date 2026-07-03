// components/about/AboutFeatures.jsx

import { ShieldCheck, Truck, BadgeDollarSign } from "lucide-react";

export default function AboutFeatures() {
  const features = [
    {
      icon: <ShieldCheck size={26} className="text-emerald-600" />,
      title: "100% AUTHENTIC PRODUCTS",
      desc: "Swato Tech Mart just distributes 100% authorized products & guarantee quality. Unlike indian markets (where fake and poor quality items are sold), we maintain strict quality rules.",
    },
    {
      icon: <Truck size={26} className="text-emerald-600" />,
      title: "FAST DELIVERY",
      desc: "Fast shipping with lots of options to deliver; 100% guarantee that your goods arrive on time and preserved carefully.",
    },
    {
      icon: <BadgeDollarSign size={26} className="text-emerald-600" />,
      title: "AFFORDABLE PRICE",
      desc: "We offer an affordable & competitive price with lots of special promotions.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

      {features.map((f, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm p-6 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
            {f.icon}
          </div>

          <h3 className="mt-4 font-semibold text-slate-800 text-sm uppercase tracking-wide">
            {f.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {f.desc}
          </p>
        </div>
      ))}

    </section>
  );
}
