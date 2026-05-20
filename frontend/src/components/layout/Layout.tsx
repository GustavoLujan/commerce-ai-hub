import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/assistant": "AI Assistant",
  "/inventory": "Inventario",
  "/reports": "Reportes",
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "Commerce AI Hub";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
