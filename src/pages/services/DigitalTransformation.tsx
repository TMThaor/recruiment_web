
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const DigitalTransformation = () => {
  return (
    <Layout>
      <PageHeader
        title="Digital Transformation"
        subtitle="Reimagine your business for the digital age"
        backgroundImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Transform Your Business for the Future</h2>
            <p className="text-lg mb-6">
              We help organizations reinvent themselves for the digital age through strategic technology adoption, process innovation, and organizational change.
            </p>
            <p className="text-muted-foreground mb-6">
              Our comprehensive digital transformation services enable businesses to enhance customer experiences, optimize operations, and create new business models that drive growth and competitive advantage.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Start Your Digital Transformation</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" 
              alt="Digital Transformation" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Digital Transformation Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Digital Strategy</h3>
              <p className="text-muted-foreground">
                Develop a comprehensive digital roadmap aligned with your business objectives and market opportunities.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Process Digitization</h3>
              <p className="text-muted-foreground">
                Reimagine and automate business processes to increase efficiency, reduce costs, and improve outcomes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Customer Experience Transformation</h3>
              <p className="text-muted-foreground">
                Create seamless, personalized digital experiences that delight customers across all touchpoints.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Data-Driven Transformation</h3>
              <p className="text-muted-foreground">
                Leverage data analytics and AI to drive insights, decision-making, and business innovation.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Legacy System Modernization</h3>
              <p className="text-muted-foreground">
                Update and replace outdated systems with modern, flexible technologies that support innovation.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Digital Culture & Change Management</h3>
              <p className="text-muted-foreground">
                Foster a culture of innovation and provide support for organizational change during transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Digital Transformation Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Holistic Approach</h3>
              <p className="text-muted-foreground">
                We address technology, processes, and people aspects of transformation for comprehensive results.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
              <p className="text-muted-foreground">
                Deep understanding of industry-specific challenges and opportunities for digital innovation.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Measurable Results</h3>
              <p className="text-muted-foreground">
                We focus on delivering tangible business outcomes and ROI from digital investments.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Transformation</h3>
              <p className="text-muted-foreground">
                Flexible approach that can start with pilot projects and scale to enterprise-wide transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's discuss how digital transformation can drive growth and innovation in your organization.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default DigitalTransformation;
