import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";
import { useEffect } from "react";

interface ProductGridProps {
  category: string;
}

const ProductGrid = ({ category }: ProductGridProps) => {
  // Fetch products based on category
  const { 
    data: products, 
    isLoading, 
    isError, 
    refetch 
  } = useQuery<Product[]>({
    queryKey: [category === "All Apps" ? "/api/products" : `/api/products/category/${category}`],
  });

  // Refetch when category changes
  useEffect(() => {
    refetch();
  }, [category, refetch]);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-6">
              <Skeleton className="h-7 w-3/4 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-5/6 mb-4" />
              <div className="flex space-x-3">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError || !products) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Unable to load products
        </h3>
        <p className="text-gray-600">
          There was an error loading the products. Please try again later.
        </p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          There are no products available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
