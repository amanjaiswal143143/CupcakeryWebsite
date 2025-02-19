import { ShoppingBag, TrendingUp, Bell } from "lucide-react";

interface Order {
  totalAmount: number;
  status: string;
}

interface AdminStatsProps {
  orders: Order[] | undefined;
}

export default function AdminStats({ orders }: AdminStatsProps) {
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

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <stat.icon className="h-6 w-6 text-primary" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
