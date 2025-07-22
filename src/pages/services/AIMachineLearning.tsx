
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const AIMachineLearning = () => {
  return (
    <Layout>
      <PageHeader
        title="AI & Machine Learning"
        subtitle="Harness the power of artificial intelligence to transform your business"
        backgroundImage="https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Intelligent Solutions for Complex Challenges</h2>
            <p className="text-lg mb-6">
              We develop AI and machine learning solutions that help businesses automate processes, gain deeper insights, and create innovative products and services.
            </p>
            <p className="text-muted-foreground mb-6">
              From predictive analytics and natural language processing to computer vision and recommendation systems, our AI expertise helps you leverage the full potential of these transformative technologies.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Discuss Your AI Project</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1680462155705-eb128d30e221?q=80&w=2070&auto=format&fit=crop" 
              alt="AI & Machine Learning" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI & Machine Learning Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Use historical data to forecast future trends, behaviors, and outcomes to make better business decisions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Natural Language Processing</h3>
              <p className="text-muted-foreground">
                Enable your systems to understand, interpret, and generate human language for chatbots, sentiment analysis, and more.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Computer Vision</h3>
              <p className="text-muted-foreground">
                Implement image and video analysis capabilities for object detection, facial recognition, and visual inspection.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Recommendation Systems</h3>
              <p className="text-muted-foreground">
                Create personalized recommendation engines that improve customer experience and increase engagement.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Process Automation</h3>
              <p className="text-muted-foreground">
                Automate repetitive tasks and complex workflows using intelligent automation powered by AI.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">AI Strategy Consulting</h3>
              <p className="text-muted-foreground">
                Strategic guidance on how AI can solve your business challenges and create new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI & Machine Learning Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Technical Excellence</h3>
              <p className="text-muted-foreground">
                Our team consists of data scientists and AI engineers with expertise in the latest AI/ML frameworks and techniques.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Business-Focused Approach</h3>
              <p className="text-muted-foreground">
                We focus on delivering AI solutions that address specific business challenges and deliver measurable ROI.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Ethical AI Development</h3>
              <p className="text-muted-foreground">
                We adhere to ethical AI principles, ensuring fairness, transparency, and responsible use of AI technologies.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-muted-foreground">
                Our AI systems are designed to grow with your business and handle increasing data volumes and complexity.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's discuss how AI and machine learning can drive innovation and growth in your organization.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AIMachineLearning;
