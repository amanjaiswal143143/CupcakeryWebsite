import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import HomePage from "@/pages/home-page";
import ProductsPage from "@/pages/products-page";
import AdminPage from "@/pages/admin-page";
import AuthPage from "@/pages/auth-page";
import CartPage from "@/pages/cart-page";
import HamperBuilder from "@/pages/hamper-builder";
import UserOrdersPage from "@/pages/user-orders";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <div className="min-h-screen w-full bg-backg round">
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/hamper-builder" component={HamperBuilder} />
        <ProtectedRoute path="/orders" component={() => <UserOrdersPage />} />
<ProtectedRoute path="/admin" component={() => <AdminPage />} adminOnly />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;