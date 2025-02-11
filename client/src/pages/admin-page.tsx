import { useQuery } from "@tanstack/react-query";
import { Order, Product, Testimonial } from "@shared/schema";
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

export default function AdminPage() {
  const { toast } = useToast();
  const { data: orders } = useQuery<Order[]>({ queryKey: ["/api/orders"] });
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
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

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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
                  <div className="flex justify-between items-center">
                    <Badge>{order.status}</Badge>
                    <p className="font-semibold">₹{order.totalAmount}</p>
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
      </Tabs>
    </div>
  );
}
