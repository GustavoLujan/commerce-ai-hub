import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { SalePoint } from "../../types";

interface RevenueChartProps {
  data: SalePoint[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-AR", { month: "short", day: "numeric" });
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-AR", { minimumFractionDigits: 0 })}`;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((d) => ({ ...d, dateLabel: formatDate(d.date) }));

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ingresos por día</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="dateLabel"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            interval={Math.floor(chartData.length / 6)}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Ingresos"]}
            labelFormatter={(label) => `Fecha: ${label}`}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Ingresos"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
