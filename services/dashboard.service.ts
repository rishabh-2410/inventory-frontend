import { apiClient } from "@/lib/apiclient";
import { dashboardSchema, DashboardStats, InventoryStats, inventoryStatsSchema } from "@/models/zodSchema/dashboard.schema";

export async function getDashboardStats() {
    const response = await apiClient.get<DashboardStats>('/dashboard');
    return dashboardSchema.parse(response.data);
}

export async function getInventoryStats() {
    const response = await apiClient.get<InventoryStats>('/inventory/stats', );
    return inventoryStatsSchema.parse(response.data);
}