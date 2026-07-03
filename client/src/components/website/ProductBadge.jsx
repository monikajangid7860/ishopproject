export default function Badge({ text = "SALE", tone = "emerald" }) {
  const palette = {
    black: "bg-black text-white px-2 py-1 rounded text-xs font-semibold",
    emerald: "bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-semibold",
  };
  return (
    <span className={palette[tone] || palette.emerald} aria-hidden>
      {text}
    </span>
  );
}
