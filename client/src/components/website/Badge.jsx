export default function Badge({ text = "NEW", tone = "slate" }) {
  const toneMap = {
    green:
      "bg-emerald-50 text-emerald-700 border border-emerald-100",
    slate:
      "bg-slate-100 text-slate-700 border border-slate-200",
  };

  const classes = toneMap[tone] || toneMap.slate;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium leading-5 tracking-wide ${classes}`}
    >
      {text}
    </span>
  );
}
