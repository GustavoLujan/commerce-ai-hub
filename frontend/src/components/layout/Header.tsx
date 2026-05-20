import { Menu } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { dateRange, setDateRange, toggleSidebar } = useAppStore();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-500">Desde</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm text-gray-500">Hasta</label>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </header>
  );
}
