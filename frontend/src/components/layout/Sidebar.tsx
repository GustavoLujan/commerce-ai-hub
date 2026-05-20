import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Bot,
  Package,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/assistant", icon: Bot, label: "AI Assistant" },
  { to: "/inventory", icon: Package, label: "Inventario" },
  { to: "/reports", icon: FileText, label: "Reportes" },
];

export default function Sidebar() {
  const open = useAppStore((s) => s.sidebarOpen);

  return (
    <aside
      className={`${
        open ? "w-56" : "w-16"
      } bg-slate-900 text-white flex flex-col transition-all duration-200 shrink-0`}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
        <TrendingUp className="text-blue-400 shrink-0" size={22} />
        {open && (
          <span className="font-bold text-sm leading-tight">
            Commerce<br />AI Hub
          </span>
        )}
      </div>

      <nav className="flex flex-col gap-1 p-2 flex-1 mt-2">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {open && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700">
        <div className="flex items-center gap-2 px-2">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
            A
          </div>
          {open && (
            <div className="text-xs">
              <p className="text-white font-medium">Admin</p>
              <p className="text-slate-400">Country Manager</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
