import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-[#805AD5] text-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find the Perfect Digital Tools
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover and purchase powerful applications and AI agents to enhance your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#marketplace">
                <Button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold h-auto">
                  Browse Marketplace
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold text-white h-auto">
                Sell Your App
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Digital Marketplace"
              className="rounded-xl shadow-2xl max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
