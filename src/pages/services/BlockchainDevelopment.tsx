
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const BlockchainDevelopment = () => {
  return (
    <Layout>
      <PageHeader
        title="Blockchain Development"
        subtitle="Innovative blockchain solutions for enhanced security, transparency, and efficiency"
        backgroundImage="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Revolutionize Your Business with Blockchain</h2>
            <p className="text-lg mb-6">
              We develop cutting-edge blockchain solutions that bring transparency, security, and efficiency to your operations and create new business opportunities.
            </p>
            <p className="text-muted-foreground mb-6">
              From smart contracts and decentralized applications (dApps) to private blockchain networks and tokenization, our blockchain expertise helps you leverage this transformative technology.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Discuss Your Blockchain Project</Link>
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop" 
              alt="Blockchain Development" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Blockchain Development Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Smart Contract Development</h3>
              <p className="text-muted-foreground">
                Secure and efficient smart contracts that automate processes, reduce intermediaries, and ensure trustless transactions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">dApp Development</h3>
              <p className="text-muted-foreground">
                Decentralized applications that leverage blockchain's distributed architecture for enhanced security and resilience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Private Blockchain Solutions</h3>
              <p className="text-muted-foreground">
                Custom private and consortium blockchain networks tailored to your specific business requirements.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Tokenization</h3>
              <p className="text-muted-foreground">
                Creation of digital assets and tokens that represent real-world value, enabling new business models and markets.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Blockchain Integration</h3>
              <p className="text-muted-foreground">
                Integration of blockchain technology with existing systems and processes within your organization.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Blockchain Consulting</h3>
              <p className="text-muted-foreground">
                Strategic guidance on how blockchain can solve your business challenges and create new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Blockchain Development Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Technical Expertise</h3>
              <p className="text-muted-foreground">
                Deep knowledge of blockchain platforms including Ethereum, Solana, Binance Smart Chain, Hyperledger, and more.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Security-First Approach</h3>
              <p className="text-muted-foreground">
                Rigorous security practices and thorough auditing to ensure your blockchain solutions are protected against vulnerabilities.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Business-Focused Solutions</h3>
              <p className="text-muted-foreground">
                We focus on delivering blockchain solutions that solve real business problems and create tangible value.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 text-corporate-500 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-muted-foreground">
                Blockchain solutions designed to grow with your business needs and handle increased transaction volumes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Blockchain Technology?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Let's discuss how blockchain can transform your business operations and create new opportunities.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default BlockchainDevelopment;
