import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { CategoryRevenue } from "../../types";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface CategoryChartProps {
  data: CategoryRevenue[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Ventas por categoría</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            dataKey="revenue"
            nameKey="name"
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString("es-AR")}`, "Ingresos"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 13 }}
          />
          <Legend
            formatter={(value) => <span style={{ fontSize: 12, color: "#374151" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
