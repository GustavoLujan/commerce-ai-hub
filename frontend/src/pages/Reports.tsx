import { Download } from "lucide-react";
import { useSales, useCategories, useRegions } from "../hooks/useSales";
import { useKPIs } from "../hooks/useKPIs";
import { useAppStore } from "../store/useAppStore";

function downloadCSV(filename: string, rows: object[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify((r as Record<string, unknown>)[h] ?? "")).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const { dateRange } = useAppStore();
  const { data: kpis } = useKPIs();
  const { data: sales = [] } = useSales();
  const { data: categories = [] } = useCategories();
  const { data: regions = [] } = useRegions();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-1">Resumen ejecutivo</h2>
        <p className="text-sm text-gray-500 mb-5">
          Período: {dateRange.start} → {dateRange.end}
        </p>

        {kpis && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Ventas totales históricas", value: `$${kpis.totalSales.toLocaleString("es-AR")}` },
              { label: "Ventas esta semana", value: `$${kpis.weeklySales.toLocaleString("es-AR")}` },
              { label: "Pedidos esta semana", value: kpis.weeklyOrders.toString() },
              { label: "Ticket promedio", value: `$${kpis.avgOrderValue.toFixed(2)}` },
            ].map((m) => (
              <div key={m.label} className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500">{m.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{m.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Top categorías (período)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                  <th className="text-left py-1.5">Categoría</th>
                  <th className="text-right py-1.5">Ingresos</th>
                </tr>
              </thead>
              <tbody>
                {(categories as Array<{name: string; revenue: number}>).map((c) => (
                  <tr key={c.name} className="border-b border-gray-50">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2 text-right font-medium">${c.revenue.toLocaleString("es-AR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Desempeño por región (período)</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                  <th className="text-left py-1.5">Región</th>
                  <th className="text-right py-1.5">Ingresos</th>
                  <th className="text-right py-1.5">Pedidos</th>
                </tr>
              </thead>
              <tbody>
                {(regions as Array<{name: string; revenue: number; orders: number}>).map((r) => (
                  <tr key={r.name} className="border-b border-gray-50">
                    <td className="py-2">{r.name}</td>
                    <td className="py-2 text-right">${r.revenue.toLocaleString("es-AR")}</td>
                    <td className="py-2 text-right">{r.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Exportar datos</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Exportar ventas diarias", data: sales, filename: `ventas_${dateRange.start}_${dateRange.end}.csv` },
            { label: "Exportar por categoría", data: categories, filename: `categorias_${dateRange.start}_${dateRange.end}.csv` },
            { label: "Exportar por región", data: regions, filename: `regiones_${dateRange.start}_${dateRange.end}.csv` },
          ].map(({ label, data, filename }) => (
            <button
              key={label}
              onClick={() => downloadCSV(filename, data as object[])}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
