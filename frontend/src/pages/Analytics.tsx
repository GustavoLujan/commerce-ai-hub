import RevenueChart from "../components/charts/RevenueChart";
import RegionalChart from "../components/charts/RegionalChart";
import CategoryChart from "../components/charts/CategoryChart";
import { useSales, useCategories, useRegions } from "../hooks/useSales";

export default function Analytics() {
  const { data: sales = [], isLoading: salesLoading } = useSales();
  const { data: categories = [] } = useCategories();
  const { data: regions = [], isLoading: regLoading } = useRegions();

  const totalRevenue = sales.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = sales.reduce((s, d) => s + d.orders, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Ingresos totales (período)", value: `$${totalRevenue.toLocaleString("es-AR")}` },
          { label: "Pedidos totales (período)", value: totalOrders.toString() },
          { label: "Ticket promedio (período)", value: totalOrders > 0 ? `$${(totalRevenue / totalOrders).toFixed(2)}` : "$0" },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">{m.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      {salesLoading ? (
        <div className="bg-white rounded-xl h-72 animate-pulse" />
      ) : (
        <RevenueChart data={sales} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {regLoading ? (
          <div className="bg-white rounded-xl h-72 animate-pulse" />
        ) : (
          <RegionalChart data={regions} />
        )}
        <CategoryChart data={categories} />
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Desglose por región</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">Región</th>
              <th className="text-right py-2 text-gray-500 font-medium">Ingresos</th>
              <th className="text-right py-2 text-gray-500 font-medium">Pedidos</th>
              <th className="text-right py-2 text-gray-500 font-medium">Ticket Prom.</th>
            </tr>
          </thead>
          <tbody>
            {(regions as Array<{name: string; revenue: number; orders: number}>).map((r) => (
              <tr key={r.name} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2.5 font-medium text-gray-900">{r.name}</td>
                <td className="py-2.5 text-right text-gray-700">${r.revenue.toLocaleString("es-AR")}</td>
                <td className="py-2.5 text-right text-gray-700">{r.orders}</td>
                <td className="py-2.5 text-right text-gray-700">
                  ${r.orders > 0 ? (r.revenue / r.orders).toFixed(2) : "0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
