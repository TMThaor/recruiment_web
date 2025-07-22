
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2013",
      title: "Company Founded",
      description: "TechSphere was founded with a mission to deliver exceptional IT outsourcing services."
    },
    {
      year: "2015",
      title: "International Expansion",
      description: "Opened our first international office and began serving clients across Europe."
    },
    {
      year: "2017",
      title: "Blockchain Department",
      description: "Established our dedicated blockchain development department as the technology gained traction."
    },
    {
      year: "2019",
      title: "AI & ML Expertise",
      description: "Expanded our AI and machine learning capabilities, becoming leaders in the field."
    },
    {
      year: "2021",
      title: "Digital Transformation Focus",
      description: "Launched our comprehensive digital transformation consulting services."
    },
    {
      year: "2023",
      title: "Major Client Milestone",
      description: "Surpassed 200 successful enterprise projects and 100 global clients."
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions."
    },
    {
      title: "Excellence",
      description: "We are committed to delivering the highest quality in everything we do."
    },
    {
      title: "Integrity",
      description: "We maintain the highest ethical standards and transparency in all our business relationships."
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients, fostering partnerships that drive success."
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="About TechSphere"
        subtitle="Your trusted partner for innovative technology solutions"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="TechSphere Team"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              Founded in 2013, TechSphere Solutions has grown from a small team of passionate developers to a global IT outsourcing company with offices in multiple countries.
            </p>
            <p className="text-lg mb-4">
              We specialize in delivering innovative technology solutions across various domains including CMS development, E-Commerce solutions, Blockchain development, AI & Machine Learning, IoT solutions, and comprehensive Digital Transformation services.
            </p>
            <p className="text-lg mb-6">
              Our mission is to empower businesses through technology, helping them navigate the complex digital landscape and achieve their strategic objectives.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-corporate-500 mt-1" />
                <p>Over 200+ successful projects delivered</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-corporate-500 mt-1" />
                <p>Team of 50+ expert developers and consultants</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-corporate-500 mt-1" />
                <p>Global client base across North America, Europe, and Asia</p>
              </div>
            </div>
            
            <Button asChild className="bg-corporate-500 hover:bg-corporate-600">
              <Link to="/about/leadership-team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle mx-auto">
              The principles that guide our work and culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-border/30">
                <div className="w-12 h-12 bg-corporate-50 dark:bg-corporate-900 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-corporate-500">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Timeline Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-title">Company Milestones</h2>
          <p className="section-subtitle mx-auto">
            Our journey of growth and innovation
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:text-right" : ""
              }`}>
                {/* Year marker for mobile */}
                <div className="md:hidden mb-4">
                  <div className="inline-block bg-corporate-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {milestone.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${
                  index % 2 === 0 
                    ? "md:pr-12" 
                    : "md:pl-12 md:ml-auto"
                }`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-border/30">
                    <div className="hidden md:block mb-3">
                      <span className="bg-corporate-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Circle for desktop */}
                <div className="hidden md:block absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 rounded-full bg-corporate-500 border-4 border-white dark:border-gray-900"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-900 py-16">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join our growing list of satisfied clients and experience the TechSphere difference.
          </p>
          <Button asChild size="lg" className="bg-corporate-500 hover:bg-corporate-600">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
