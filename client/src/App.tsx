import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import AuthPage from "@/pages/auth-page";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/cart">
        {() => {
          const { user, isLoading } = useAuth();
          if (isLoading) {
            return (
              <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-border" />
              </div>
            );
          }
          if (!user) {
            return <Redirect to="/auth" />;
          }
          return <Cart />;
        }}
      </Route>
      <Route path="/checkout">
        {() => {
          const { user, isLoading } = useAuth();
          if (isLoading) {
            return (
              <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-border" />
              </div>
            );
          }
          if (!user) {
            return <Redirect to="/auth" />;
          }
          return <Checkout />;
        }}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
