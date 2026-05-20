import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import type { Product } from "../types";

export function useInventory(search?: string, category?: string) {
  return useQuery<Product[]>({
    queryKey: ["inventory", search, category],
    queryFn: async () =>
      (await client.get("/inventory", { params: { search: search || undefined, category: category || undefined } }))
        .data,
  });
}
