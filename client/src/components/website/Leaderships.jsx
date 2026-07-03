// components/about/Leaderships.jsx

export default function Leaderships() {
  const leaders = [
    { name: "Henry Aveey", title: "CEO", img: "https://i.pravatar.cc/300?img=12" },
    { name: "Michael Edward", title: "COO", img: "https://i.pravatar.cc/300?img=32" },
    { name: "Eden Hussain", title: "CTO", img: "https://i.pravatar.cc/300?img=45" },
    { name: "Robert Downey Jr.", title: "CFO", img: "https://i.pravatar.cc/300?img=22" },
    { name: "Nathan Drake", title: "CMO", img: "https://i.pravatar.cc/300?img=51" },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 md:p-10">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800 uppercase">LEADERSHIPS</h2>
        <span className="text-xs text-slate-500">Team of 2024</span>
      </div>

      {/* Horizontal leader cards */}
      <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
        {leaders.map((l, i) => (
          <div
            key={i}
            className="min-w-[180px] bg-white rounded-xl shadow-sm p-4 flex flex-col items-center"
          >
            <img
              src={l.img}
              alt={l.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <h4 className="mt-3 font-semibold text-slate-800 text-sm">{l.name}</h4>
            <p className="text-xs text-slate-500">{l.title}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
