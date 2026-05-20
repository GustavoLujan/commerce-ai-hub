import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import type { KPIs } from "../types";

export function useKPIs() {
  return useQuery<KPIs>({
    queryKey: ["kpis"],
    queryFn: async () => (await client.get("/kpis")).data,
    refetchInterval: 60_000,
  });
}
