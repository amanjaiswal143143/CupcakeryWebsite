import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route } from "wouter";
import { useLocation } from "wouter";// Correct way to navigate

export function ProtectedRoute({
  path,
  component: Component,
  adminOnly = false,
}: {
  path: string;
  component: () => React.JSX.Element;
  adminOnly?: boolean;
}) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation(); // Correct way to navigate in Wouter

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user || (adminOnly && !user.isAdmin)) {
    navigate("/auth"); // Redirect user in Wouter
    return null; // Return null to prevent rendering
  }

  return (
    <Route path={path}>
      <Component />
    </Route>
  );
}
