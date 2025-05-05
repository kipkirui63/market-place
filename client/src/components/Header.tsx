import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart, X, User, LogOut } from "lucide-react";

const Header = () => {
  const { items, isCartOpen, setIsCartOpen } = useCart();
  const { user, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    setSearchQuery("");
  };

  const toggleCart = () => {
    // If we're on the cart page, navigate to home when clicking the cart button
    if (location === "/cart") {
      navigate("/");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="text-primary text-2xl font-bold">AppMarket</span>
          </a>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                placeholder="Search applications..."
                className="w-64 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/">
                  <a className="text-gray-800 hover:text-primary font-medium">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#marketplace">
                  <a className="text-gray-800 hover:text-primary font-medium">
                    Categories
                  </a>
                </Link>
              </li>
              <li>
                <a className="text-gray-800 hover:text-primary font-medium">
                  My Apps
                </a>
              </li>
            </ul>
          </nav>

          {/* Cart Button */}
          <div className="relative">
            <Button
              onClick={toggleCart}
              variant="ghost"
              className="p-2 text-xl relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuLabel>Hello, {user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>My Apps</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetClose className="absolute right-4 top-4">
              <X className="h-5 w-5" />
            </SheetClose>
          </SheetHeader>
          <div className="py-4">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link href="/">
                    <a
                      className="block py-2 text-gray-800 hover:text-primary font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/#marketplace">
                    <a
                      className="block py-2 text-gray-800 hover:text-primary font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Categories
                    </a>
                  </Link>
                </li>
                <li>
                  <a className="block py-2 text-gray-800 hover:text-primary font-medium">
                    My Apps
                  </a>
                </li>
                <li>
                  {user ? (
                    <Button 
                      className="w-full mt-4 flex items-center justify-center" 
                      onClick={() => {
                        logoutMutation.mutate();
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => {
                        navigate("/auth");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
