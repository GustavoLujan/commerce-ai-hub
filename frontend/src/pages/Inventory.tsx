import { useState } from "react";
import { Search, Filter } from "lucide-react";
import InventoryTable from "../components/inventory/InventoryTable";
import { useInventory } from "../hooks/useInventory";
import { useCategoryList } from "../hooks/useSales";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data: categories = [] } = useCategoryList();
  const { data: products = [], isLoading } = useInventory(debouncedSearch, category);

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout((window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer);
    (window as unknown as { _searchTimer?: ReturnType<typeof setTimeout> })._searchTimer = setTimeout(
      () => setDebouncedSearch(value),
      300
    );
  };

  const critical = products.filter((p) => p.status === "critical").length;
  const low = products.filter((p) => p.status === "low").length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Total productos</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100 shadow-sm">
          <p className="text-sm text-red-600">Stock crítico (&lt;10)</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{critical}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 shadow-sm">
          <p className="text-sm text-yellow-600">Stock bajo (&lt;30)</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">{low}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl h-64 animate-pulse" />
      ) : (
        <InventoryTable products={products} />
      )}
    </div>
  );
}
