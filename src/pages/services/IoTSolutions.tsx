
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const IoTSolutions = () => {
  return (
    <Layout>
      <PageHeader
        title="IoT Solutions"
        subtitle="Connect, collect, and analyze data from devices to transform your operations"
        backgroundImage="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Build a Smarter Connected Future</h2>
            <p className="text-lg mb-6">
              We develop comprehensive IoT solutions that connect devices, collect valuable data, and provide actionable insights to transform your operations.
            </p>
            <p className="text-muted-foreground mb-6">
              From industrial IoT and smart buildings to connected products and IoT analytics platforms, our expertise helps you harness the power of connected devices to drive efficiency and innovation.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Discuss Your IoT Project</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?q=80&w=2067&auto=format&fit=crop" 
              alt="IoT Solutions" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our IoT Development Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">IoT Strategy & Consulting</h3>
              <p className="text-muted-foreground">
                Strategic guidance on how IoT can transform your business processes and create new opportunities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">IoT Application Development</h3>
              <p className="text-muted-foreground">
                Custom applications that collect, monitor, and analyze data from connected devices.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Embedded Systems Development</h3>
              <p className="text-muted-foreground">
                Design and development of firmware and software for IoT devices and embedded systems.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">IoT Platform Development</h3>
              <p className="text-muted-foreground">
                Custom IoT platforms that enable device management, data collection, analysis, and visualization.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">IoT Integration</h3>
              <p className="text-muted-foreground">
                Seamless integration of IoT solutions with existing enterprise systems and cloud platforms.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">IoT Analytics</h3>
              <p className="text-muted-foreground">
                Advanced analytics solutions that transform IoT data into actionable business insights.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our IoT Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">End-to-End Expertise</h3>
              <p className="text-muted-foreground">
                Comprehensive capabilities spanning hardware integration, embedded software, cloud platforms, and analytics.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Security-First Approach</h3>
              <p className="text-muted-foreground">
                Robust security measures across all layers of the IoT stack to protect sensitive data and systems.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                IoT solutions designed to scale from pilot projects to full enterprise deployments.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Business-Focused Solutions</h3>
              <p className="text-muted-foreground">
                We focus on delivering IoT solutions that solve real business problems and create measurable value.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect Your Business?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's discuss how IoT solutions can transform your operations and create new business opportunities.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default IoTSolutions;
