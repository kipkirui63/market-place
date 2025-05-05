import { Shield, RefreshCcw, Headphones } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Buy From AppMarket?</h2>
          <p className="text-lg text-gray-600">
            Discover top-quality applications built by developers who understand your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Purchases</h3>
            <p className="text-gray-600">
              All transactions are encrypted and secure. We never store your payment details.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCcw className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">30-Day Refund</h3>
            <p className="text-gray-600">
              Not satisfied? Get a full refund within 30 days of your purchase, no questions asked.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="text-primary text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is always available to help with any issues or questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
