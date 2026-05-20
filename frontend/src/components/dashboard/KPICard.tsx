import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export default function KPICard({ title, value, trend, icon: Icon, color, subtitle }: KPICardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {trend !== undefined && (
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(trend)}% vs semana anterior</span>
        </div>
      )}
    </div>
  );
}
