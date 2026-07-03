// api-calls/adminOrders.js
import { axiosApiInstance } from "@/helper/helper";

export async function getRecentAdminOrders() {
  const res = await axiosApiInstance.get("/admin/orders/recent");
  return res.data;
}
