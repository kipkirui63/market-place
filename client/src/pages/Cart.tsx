import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, removeItem, getCartTotal } = useCart();
  const [_, navigate] = useLocation();
  
  const { subtotal, tax, total } = getCartTotal();

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 font-medium">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <span className="text-gray-500">{items.length} item(s)</span>
        </div>

        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="py-4 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">
                    ${formatPrice(item.price)} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-primary mr-4">
                  ${formatPrice(item.price * item.quantity)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span className="font-semibold">${formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (7%):</span>
            <span className="font-semibold">${formatPrice(tax)}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">${formatPrice(total)}</span>
          </div>

          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="outline" className="flex-1">
                Continue Shopping
              </Button>
            </Link>
            <Button
              onClick={() => navigate("/checkout")}
              className="bg-primary hover:bg-primary/90 text-white flex-1 flex items-center justify-center space-x-2"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
