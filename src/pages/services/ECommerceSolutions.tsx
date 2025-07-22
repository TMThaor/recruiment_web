
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ECommerceSolutions = () => {
  return (
    <Layout>
      <PageHeader
        title="E-Commerce Solutions"
        subtitle="Powering online retail experiences that drive conversions and customer loyalty"
        backgroundImage="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Elevate Your Online Store</h2>
            <p className="text-lg mb-6">
              We build powerful e-commerce platforms that combine stunning design with seamless functionality to create exceptional shopping experiences.
            </p>
            <p className="text-muted-foreground mb-6">
              From small boutique shops to large-scale marketplace solutions, our e-commerce development services are tailored to your unique business model, target audience, and revenue goals.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Start Your E-Commerce Project</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop" 
              alt="E-Commerce Solutions" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our E-Commerce Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Custom E-Commerce Development</h3>
              <p className="text-muted-foreground">
                Tailor-made online stores built from the ground up to match your unique business requirements and brand identity.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Platform Implementation</h3>
              <p className="text-muted-foreground">
                Expert implementation of leading e-commerce platforms like Shopify, WooCommerce, Magento, and BigCommerce.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Marketplace Development</h3>
              <p className="text-muted-foreground">
                Multi-vendor marketplace solutions that enable multiple sellers to list products and process transactions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">E-Commerce Integration</h3>
              <p className="text-muted-foreground">
                Seamless integration with payment gateways, shipping services, inventory management, and other business systems.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Mobile Commerce</h3>
              <p className="text-muted-foreground">
                Mobile-first e-commerce solutions that deliver outstanding shopping experiences across all devices.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">E-Commerce Optimization</h3>
              <p className="text-muted-foreground">
                Performance optimization, UX improvements, and conversion rate optimization for existing online stores.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our E-Commerce Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Conversion-Focused Design</h3>
              <p className="text-muted-foreground">
                Our e-commerce solutions are designed to guide visitors through the buying journey and maximize conversions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                Build to handle growth in traffic, products, and transactions without compromising performance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Advanced security measures to protect customer data and ensure safe, reliable payment processing.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Omnichannel Capabilities</h3>
              <p className="text-muted-foreground">
                Integrate your online store with physical retail locations, social selling channels, and marketplaces.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Online Sales?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's create an e-commerce solution that drives growth and delivers exceptional customer experiences.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ECommerceSolutions;
