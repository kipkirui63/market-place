import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Monitor } from "lucide-react";
import { Product } from "@shared/schema";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: () => void;
}

const DemoModal = ({ isOpen, onClose, product, onAddToCart }: DemoModalProps) => {
  const handleAddToCart = () => {
    onAddToCart();
    onClose();
  };

  // Define product features based on product's category
  const getProductFeatures = (category: string) => {
    switch (category) {
      case "Productivity":
        return [
          "Smart task automation",
          "Content generation with AI",
          "Voice commands and recognition",
          "Integration with popular apps",
          "Custom workflow creation"
        ];
      case "Business":
        return [
          "Real-time data analytics",
          "Interactive dashboards",
          "AI-powered insights",
          "Multiple export formats",
          "Team collaboration features"
        ];
      case "Social Media":
        return [
          "Multi-platform posting",
          "Engagement analytics",
          "Content scheduling",
          "Audience targeting",
          "Performance reporting"
        ];
      case "Development":
        return [
          "Code completion and suggestions",
          "Multiple language support",
          "Error detection and fixes",
          "Integration with IDEs",
          "Code optimization tools"
        ];
      default:
        return [
          "User-friendly interface",
          "Cloud synchronization",
          "AI-powered features",
          "Regular updates",
          "24/7 support"
        ];
    }
  };

  const features = getProductFeatures(product.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {product.name} Demo
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogHeader>
        <div className="p-2">
          <div className="mb-6">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-6">
              <div className="text-center p-8">
                <Monitor className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500">Demo video would play here</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
            <p className="text-gray-600 mb-4">
              {product.description} This demo shows the key features and how to get started.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
