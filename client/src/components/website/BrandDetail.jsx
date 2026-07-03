"use client";

export default function BrandDetail() {
  return (
    <section className="w-full overflow-x-hidden bg-[#e9eaf0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h2 className="text-[22px] font-semibold text-gray-900 mb-6">
          Swoo – #1 Online Marketplace for technology
        </h2>

        {/* Paragraph 1 */}
        <p className="text-[15px] leading-[1.75] text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae posuere mi.
          Quisque iaculis dignissim scelerisque. Morbi condimentum sagittis leo vitae tempor.
          Suspendisse in dolor odio. Sed aliquet ac lacus ut luctus. Fusce mattis sollicitudin sem,
          id lobortis nibh ullamcorper a. Donec vehicula dolor et arcu consequat mattis.
          Fusce mattis nec nulla in scelerisque.
        </p>

        {/* Paragraph 2 */}
        <p className="text-[15px] leading-[1.75] text-gray-700 mb-10">
          Morbi pharetra sem mauris, nec aliquet ipsum vestibulum suscipit. Curabitur non
          euismod dui. Proin eget justo eu erat luctus placerat. Nam rhoncus ipsum ac enim
          faucibus, at consequat ante maximus. Vestibulum at nibh ac odio ultrices varius.
          Duis vitae libero mollis, lobortis ligula id, varius erat. Sed id odio dictum,
          laoreet enim ac, commodo magna. Praesent sodales porttitor maximus. Sed a lacus
          felis. Maecenas consectetur consequat orci scelerisque malesuada. Fusce vel orci
          eu tortor consequat mattis quis at ante. Class aptent taciti sociosqu ad litora
          torquent per conubi,
        </p>

        {/* View all link */}
        <button className="text-[15px] font-medium text-gray-900 underline hover:text-black">
          View All
        </button>
      </div>
    </section>
  );
}
