import { create } from "zustand";

function defaultRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

interface AppState {
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  dateRange: defaultRange(),
  setDateRange: (range) => set({ dateRange: range }),
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
