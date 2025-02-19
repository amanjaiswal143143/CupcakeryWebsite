import { useState } from "react";
import { useCartStore } from "@/store/store";
import useAuth from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import UPIPayment from "@/components/payment/upi-payment";
import ReviewForm from "@/components/reviews/review-form";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

export default function CartPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [showReview, setShowReview] = useState(false);

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      phone: "",
    },
  });

  if (!user) {
    setLocation("/auth");
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
              <Button onClick={() => setLocation("/products")}>
                Browse Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutData) => {
    try {
      setIsSubmitting(true);
      const orderData = {
        ...data,
        items: JSON.stringify(items),
        totalAmount: total(),
        status: "pending",
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      const order = await response.json();
      setOrderId(order.id);
      setShowPayment(true);
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = async () => {
    try {
      const whatsappUrl = `https://wa.me/+919770096693?text=${encodeURIComponent(
        `New order #${orderId} received!\n\nCustomer: ${form.getValues(
          "customerName"
        )}\nPhone: ${form.getValues("phone")}\nAmount: ₹${total()}\n\nItems:\n${items
          .map((item) => `${item.product.name} x${item.quantity}`)
          .join("\n")}`
      )}`;
      window.open(whatsappUrl, "_blank");

      clearCart();
      setShowPayment(false);
      setShowReview(true); // Show review form after payment
    } catch (error) {
      toast({
        title: "Error sending notification",
        description:
          "Your order is confirmed but we couldn't send the notification",
        variant: "destructive",
      });
    }
  };

  const handleReviewSubmit = () => {
    toast({ title: "Order placed successfully!" });
    setLocation("/products");
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>
      {showReview ? (
        <div className="max-w-md mx-auto">
          <ReviewForm orderId={orderId!} onSubmit={handleReviewSubmit} />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card>
                    <CardContent>
                      <div className="flex gap-4">
                        <div className="w-24 h-24">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.product.price} × {item.quantity}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newQuantity = item.quantity - 1;
                                if (newQuantity === 0) {
                                  removeItem(item.product.id);
                                } else {
                                  updateQuantity(
                                    item.product.id,
                                    newQuantity
                                  );
                                }
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  Complete your order by providing delivery details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{total()}</span>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      Place Order
                    </Button>
                  </form>
                </Form>
                {showPayment && orderId && (
                  <div className="mt-4">
                    <UPIPayment
                      amount={total()}
                      merchantUPI="merchant@upi" // Replace with actual merchant UPI ID
                      orderId={orderId.toString()}
                      onPaymentComplete={handlePaymentComplete}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}