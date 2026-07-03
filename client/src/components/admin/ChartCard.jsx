export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="h-[320px]">{children}</div>
    </div>
  );
}
