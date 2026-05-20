interface StockBadgeProps {
  status: "ok" | "low" | "critical";
  stock: number;
}

const CONFIG = {
  ok: { label: "OK", classes: "bg-green-100 text-green-700" },
  low: { label: "Bajo", classes: "bg-yellow-100 text-yellow-700" },
  critical: { label: "Crítico", classes: "bg-red-100 text-red-700" },
};

export default function StockBadge({ status, stock }: StockBadgeProps) {
  const { label, classes } = CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "ok" ? "bg-green-500" : status === "low" ? "bg-yellow-500" : "bg-red-500"}`} />
      {label} ({stock})
    </span>
  );
}
