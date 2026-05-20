import { useState } from "react";
import type { Product } from "../../types";
import StockBadge from "./StockBadge";
import { ChevronUp, ChevronDown } from "lucide-react";

interface InventoryTableProps {
  products: Product[];
}

type SortKey = "name" | "price" | "stock" | "category";

export default function InventoryTable({ products }: InventoryTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("stock");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const sorted = [...products].sort((a, b) => {
    const va = a[sortKey];
    const vb = b[sortKey];
    const cmp = typeof va === "string" ? va.localeCompare(vb as string) : (va as number) - (vb as number);
    return sortAsc ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else { setSortKey(key); setSortAsc(true); }
    setPage(0);
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (sortAsc ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : null;

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {(["name", "category", "price", "stock"] as SortKey[]).map((k) => (
                <th
                  key={k}
                  onClick={() => toggleSort(k)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-gray-700"
                >
                  <span className="flex items-center gap-1">
                    {{ name: "Producto", category: "Categoría", price: "Precio", stock: "Stock" }[k]}
                    <SortIcon k={k} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                SKU
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paged.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-gray-900">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-900">{p.stock}</td>
                <td className="px-4 py-3">
                  <StockBadge status={p.status} stock={p.stock} />
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{p.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} de {sorted.length} productos
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
