import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";

interface OrderConfirmationProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
}

const OrderConfirmation = ({ isOpen, orderId, onClose }: OrderConfirmationProps) => {
  const { clearCart } = useCart();
  const [_, navigate] = useLocation();

  const handleContinueShopping = () => {
    clearCart();
    navigate("/");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="text-white text-2xl" />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-2">
            Order Successful!
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will receive an email with your purchase details.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="font-medium">
            Order #: <span id="orderNumber">{orderId}</span>
          </p>
        </div>

        <Button
          onClick={handleContinueShopping}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold"
        >
          Continue Shopping
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;
