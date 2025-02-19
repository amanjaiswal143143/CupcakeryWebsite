import { useQuery } from "@tanstack/react-query";
import { Order } from "@shared/schema";
import useAuth from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReviewForm from "@/components/reviews/review-form";
import { useState } from "react";

export default function UserOrdersPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const { data: orders } = useQuery<Order[]>({
    queryKey: ["/api/orders/user"],
    enabled: !!user,
  });

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {selectedOrderId ? (
            <div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="mb-4 text-primary hover:underline"
              >
                ← Back to Orders
              </button>
              <ReviewForm
                orderId={selectedOrderId}
                onSubmit={() => setSelectedOrderId(null)}
              />
            </div>
          ) : (
            orders?.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription>
                        {new Date(order.createdAt ?? '').toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Order Details</h3>
                        <p>Amount: ₹{order.totalAmount}</p>
                        <p>Phone: {order.phone}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Items</h3>
                        <div className="space-y-2">
                          {JSON.parse(order.items).map((item: any) => (
                            <div
                              key={item.product.id}
                              className="flex justify-between"
                            >
                              <span>{item.product.name}</span>
                              <span>x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {order.status === "completed" && (
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className="text-primary hover:underline"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
