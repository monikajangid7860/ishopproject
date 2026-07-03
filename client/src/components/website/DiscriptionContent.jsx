// app/product/[id]/TabContent/DescriptionContent.jsx

export default function DescriptionContent() {
  return (
    <div className="space-y-10">

      {/* Top Image */}
      <img
        src="/images/productdescription.jpg"
        alt="Product Image"
        className="rounded-lg w-full"
      />

      <p className="text-gray-700 leading-relaxed">
        Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S8 goes
        anywhere you go. Photos, movies and documents pop on a clear, crisp Super AMOLED display...
      </p>

      {/* From Manufacturer */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">From the manufacturer</h3>
        <p className="text-gray-700 leading-relaxed">
          Dive into the files/documents you need easily...
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src="/images/pd1.png"
          alt=""
          className="rounded-lg w-full h-auto object-cover"
        />
        <img
          src="/images/pd2.png"
          alt=""
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div>
        <h3 className="font-semibold text-lg">Samsung Galaxy Tab S8, 8-inch, White</h3>
        <p className="text-gray-700 leading-relaxed">
          The Samsung Galaxy Tab S8 offers small screen brilliance...Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S2 goes anywhere you go. Photos, movies and documents pop on a crisp, clear Super AMOLED display. Expandable memory lets you enjoy more of your favorite content. And connecting and sharing between all your Samsung devices is easier than ever. Welcome to life with the reimagined Samsung Galaxy Tab S2. Watch thev world come to life on your tablet's Super AMOLED display * . With deep contrast, rich colors and crisp details, you won't miss a thing
        </p>
        <button className="text-blue-600 font-medium mt-2">SHOW MORE</button>
      </div>
    </div>
  );
}
