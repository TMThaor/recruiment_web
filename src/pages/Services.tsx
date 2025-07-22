
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";

const Services = () => {
  return (
    <Layout>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive technology solutions to drive your business forward"
        backgroundImage="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
      />
      <ServicesSection />
      
      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Development Process</h2>
          <p className="section-subtitle mx-auto">
            We follow a proven methodology to ensure successful project delivery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative shadow-sm border border-border/30">
            <div className="bg-corporate-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Discovery</h3>
            <p className="text-muted-foreground">
              We dive deep into your business needs, objectives, and technical requirements.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative shadow-sm border border-border/30">
            <div className="bg-corporate-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Design</h3>
            <p className="text-muted-foreground">
              Creating detailed designs, architecture plans, and technical specifications.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative shadow-sm border border-border/30">
            <div className="bg-corporate-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Development</h3>
            <p className="text-muted-foreground">
              Agile development with regular iterations, demos, and client feedback.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative shadow-sm border border-border/30">
            <div className="bg-corporate-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold mb-3">Delivery</h3>
            <p className="text-muted-foreground">
              Testing, deployment, training, and ongoing support and maintenance.
            </p>
          </div>
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
};

export default Services;
