// components/about/MissionVision.jsx

export default function MissionVision() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 md:p-10 space-y-6">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-slate-800 uppercase">
        OUR MISSION AND VISION
      </h2>

      {/* Paragraph */}
      <p className="text-sm text-slate-600 leading-relaxed">
        Swato Tech Mart is a huge, dynamic, and modern market in region. Our core
        values revolve around commitments to our staff, clients, vendors and our
        environment. We care about transparency, quality and creating an excellent
        customer experience. We aim to help people connect and find unique goods.
        We want to inspire entrepreneurs by supporting their journey through tools,
        technology and marketplaces. We build strong bridges between great buyers
        and great sellers. Visionary minds deserve the best resources. With Swato
        Mart, those resources are accessible.
      </p>

      {/* Large image */}
      <div className="rounded-xl overflow-hidden">
        <img
          src="/mnt/data/0f83fbc5-7a87-4a97-8048-f4073d26ae07.png"
          alt="City view"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
