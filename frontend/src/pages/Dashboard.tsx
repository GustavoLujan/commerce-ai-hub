import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import KPICard from "../components/dashboard/KPICard";
import RevenueChart from "../components/charts/RevenueChart";
import CategoryChart from "../components/charts/CategoryChart";
import { useKPIs } from "../hooks/useKPIs";
import { useSales, useCategories } from "../hooks/useSales";

function SkeletonCard() {
  return <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-32 animate-pulse bg-gray-100" />;
}

export default function Dashboard() {
  const { data: kpis, isLoading: kpiLoading } = useKPIs();
  const { data: sales = [], isLoading: salesLoading } = useSales();
  const { data: categories = [], isLoading: catLoading } = useCategories();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : kpis ? (
          <>
            <KPICard
              title="Ventas esta semana"
              value={`$${kpis.weeklySales.toLocaleString("es-AR")}`}
              trend={kpis.salesTrend}
              icon={DollarSign}
              color="bg-blue-500"
              subtitle={`Total histórico: $${(kpis.totalSales / 1000).toFixed(0)}k`}
            />
            <KPICard
              title="Pedidos esta semana"
              value={kpis.weeklyOrders.toString()}
              icon={ShoppingCart}
              color="bg-green-500"
              subtitle="Órdenes procesadas"
            />
            <KPICard
              title="Ticket promedio"
              value={`$${kpis.avgOrderValue.toFixed(2)}`}
              icon={TrendingUp}
              color="bg-purple-500"
              subtitle="Por orden esta semana"
            />
            <KPICard
              title="Alertas de stock"
              value={kpis.lowStockAlerts.toString()}
              icon={AlertTriangle}
              color={kpis.lowStockAlerts > 5 ? "bg-red-500" : "bg-orange-400"}
              subtitle="Productos con stock < 20"
            />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {salesLoading ? (
            <div className="bg-white rounded-xl p-5 h-72 animate-pulse bg-gray-100" />
          ) : (
            <RevenueChart data={sales} />
          )}
        </div>
        <div>
          {catLoading ? (
            <div className="bg-white rounded-xl p-5 h-72 animate-pulse bg-gray-100" />
          ) : (
            <CategoryChart data={categories} />
          )}
        </div>
      </div>
    </div>
  );
}
