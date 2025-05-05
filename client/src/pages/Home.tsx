import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Apps");
  
  // Scroll to marketplace section when clicking on browse marketplace button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#marketplace") {
        const marketplaceSection = document.getElementById("marketplace");
        if (marketplaceSection) {
          marketplaceSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Handle initial hash if present
    handleHashChange();

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div>
      <Hero />
      <CategoryFilter 
        onCategoryChange={setSelectedCategory} 
        selectedCategory={selectedCategory} 
      />
      <section id="marketplace" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Featured Applications</h2>
          <ProductGrid category={selectedCategory} />
        </div>
      </section>
      <Features />
      <Newsletter />
    </div>
  );
};

export default Home;
