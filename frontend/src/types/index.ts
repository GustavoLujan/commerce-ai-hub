export interface KPIs {
  totalSales: number;
  weeklySales: number;
  salesTrend: number;
  weeklyOrders: number;
  avgOrderValue: number;
  activeProducts: number;
  activeCustomers: number;
  lowStockAlerts: number;
}

export interface SalePoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategoryRevenue {
  name: string;
  revenue: number;
}

export interface RegionRevenue {
  name: string;
  revenue: number;
  orders: number;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: "ok" | "low" | "critical";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
