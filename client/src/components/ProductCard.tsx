import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Play } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@shared/schema";
import DemoModal from "./DemoModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image,
    });
  };

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {product.badge && (
            <div className={`absolute top-3 right-3 ${
              product.badge === "NEW" 
                ? "bg-[#805AD5]" 
                : product.badge === "TRENDING" || product.badge === "BESTSELLER" 
                  ? "bg-[#F6AD55]" 
                  : "bg-primary"
            } text-white text-xs font-bold px-2 py-1 rounded`}>
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <span className="text-lg font-bold text-primary">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            {renderRatingStars(parseFloat(product.rating))}
            <span className="text-gray-600 ml-2">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              Add to Cart
            </Button>
            <Button
              onClick={() => setIsDemoOpen(true)}
              variant="secondary"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              <Play className="h-4 w-4 mr-1" /> Demo
            </Button>
          </div>
        </div>
      </div>
      
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        product={product}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductCard;
