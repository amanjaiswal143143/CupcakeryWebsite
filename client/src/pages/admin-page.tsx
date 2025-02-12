import { useQuery } from "@tanstack/react-query";
import { Order, Product, Testimonial, Notification } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  ShoppingBag,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function AdminPage() {
  const { toast } = useToast();
  const { data: orders } = useQuery<Order[]>({ queryKey: ["/api/orders"] });
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
  });

  const approveTestimonial = async (id: number) => {
    try {
      await apiRequest("POST", `/api/testimonials/${id}/approve`);
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Testimonial approved successfully" });
    } catch (error) {
      toast({
        title: "Error approving testimonial",
        variant: "destructive",
      });
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await apiRequest("PATCH", `/api/orders/${id}/status`, { status });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({ title: "Order status updated successfully" });
    } catch (error) {
      toast({
        title: "Error updating order status",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Total Orders",
      value: orders?.length || 0,
      icon: ShoppingBag,
    },
    {
      title: "Total Revenue",
      value: orders?.reduce((sum, order) => sum + Number(order.totalAmount), 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || "₹0",
      icon: TrendingUp,
    },
    {
      title: "Pending Orders",
      value: orders?.filter(order => order.status === 'pending').length || 0,
      icon: Bell,
    },
  ];

  const ordersByStatus = orders?.reduce((acc: { [key: string]: number }, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(ordersByStatus || {}).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="flex items-center p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="grid gap-4">
            {orders?.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    {order.customerName} - {order.phone}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 justify-between items-center">
                    <Badge>{order.status}</Badge>
                    <p className="font-semibold">₹{order.totalAmount}</p>
                    <div className="space-x-2">
                      {order.status === 'pending' && (
                        <>
                          <Button onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                            Confirm
                          </Button>
                          <Button variant="destructive" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                            Cancel
                          </Button>
                        </>
                      )}
                      {order.status === 'confirmed' && (
                        <Button onClick={() => updateOrderStatus(order.id, 'completed')}>
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials">
          <div className="grid gap-4">
            {testimonials?.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>Rating: {testimonial.rating}/5</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{testimonial.comment}</p>
                  {!testimonial.isApproved && (
                    <Button
                      onClick={() => approveTestimonial(testimonial.id)}
                    >
                      Approve
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="grid gap-4">
            {notifications?.map((notification) => (
              <Card key={notification.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{notification.title}</CardTitle>
                    {notification.isRead ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Badge>New</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{notification.message}</p>
                  <p className="text-sm text-muted-foreground mt-2">
  {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : 'Unknown'}
</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}