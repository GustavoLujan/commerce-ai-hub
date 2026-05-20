import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import type { SalePoint } from "../types";
import { useAppStore } from "../store/useAppStore";

export function useSales() {
  const { start, end } = useAppStore((s) => s.dateRange);
  return useQuery<SalePoint[]>({
    queryKey: ["sales", start, end],
    queryFn: async () => (await client.get("/sales", { params: { start, end } })).data,
  });
}

export function useCategories() {
  const { start, end } = useAppStore((s) => s.dateRange);
  return useQuery({
    queryKey: ["categories", start, end],
    queryFn: async () => (await client.get("/categories", { params: { start, end } })).data,
  });
}

export function useRegions() {
  const { start, end } = useAppStore((s) => s.dateRange);
  return useQuery({
    queryKey: ["regions", start, end],
    queryFn: async () => (await client.get("/regions", { params: { start, end } })).data,
  });
}

export function useCategoryList() {
  return useQuery<string[]>({
    queryKey: ["category-list"],
    queryFn: async () => (await client.get("/category-list")).data,
  });
}
