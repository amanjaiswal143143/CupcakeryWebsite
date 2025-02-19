export type OrderStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id: number;
  customerName: string;
  phone: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
}
