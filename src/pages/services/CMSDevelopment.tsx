
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const CMSDevelopment = () => {
  return (
    <Layout>
      <PageHeader
        title="CMS Development"
        subtitle="Custom content management solutions tailored to your business needs"
        backgroundImage="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Empower Your Content Strategy</h2>
            <p className="text-lg mb-6">
              We build customized content management systems that make content creation, publishing, and management seamless and efficient for your team.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you need a simple blog platform or a complex enterprise CMS with advanced workflows, our solutions are tailored to your specific business requirements. We focus on intuitive interfaces, robust architecture, and scalable design.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Request a Consultation</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?q=80&w=2074&auto=format&fit=crop" 
              alt="CMS Development" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our CMS Development Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Custom CMS Development</h3>
              <p className="text-muted-foreground">
                Bespoke content management systems built from the ground up to meet your unique requirements and workflows.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">WordPress Development</h3>
              <p className="text-muted-foreground">
                Custom WordPress themes, plugins, and extensions that transform the popular CMS into your ideal platform.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Headless CMS Solutions</h3>
              <p className="text-muted-foreground">
                Modern headless architecture that separates your content from presentation, enabling omnichannel content delivery.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">CMS Migration</h3>
              <p className="text-muted-foreground">
                Seamless migration of your content and data from legacy systems to modern, efficient platforms.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">CMS Integration</h3>
              <p className="text-muted-foreground">
                Connect your CMS with other business tools, including CRM systems, marketing automation, and e-commerce platforms.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">CMS Training & Support</h3>
              <p className="text-muted-foreground">
                Comprehensive training and ongoing support to ensure your team can effectively manage your content.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our CMS Development Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">User-Centric Design</h3>
              <p className="text-muted-foreground">
                We create intuitive admin interfaces that make content management a breeze, reducing training time and increasing productivity.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                Our CMS solutions are built to grow with your business, handling increasing content volumes and user traffic without performance issues.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">SEO-Friendly Structure</h3>
              <p className="text-muted-foreground">
                We implement SEO best practices in our CMS development, ensuring your content is optimized for search engines.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Security-First Approach</h3>
              <p className="text-muted-foreground">
                Advanced security measures to protect your content and data from unauthorized access and cyber threats.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Content Management?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's discuss how our CMS development services can help streamline your content operations and enhance your digital presence.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CMSDevelopment;
