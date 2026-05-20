import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { RegionRevenue } from "../../types";

interface RegionalChartProps {
  data: RegionRevenue[];
}

export default function RegionalChart({ data }: RegionalChartProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ventas por región</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString("es-AR")}`, ""]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
          />
          <Legend />
          <Bar dataKey="revenue" name="Ingresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="orders" name="Pedidos" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
