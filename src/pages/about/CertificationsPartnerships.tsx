
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";

const CertificationsPartnerships = () => {
  const certifications = [
    {
      name: "ISO 27001",
      description: "Information Security Management System certification, demonstrating our commitment to protecting client data.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "ISO 9001",
      description: "Quality Management System certification, ensuring consistent, high-quality service delivery.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "CMMI Level 5",
      description: "Highest level of the Capability Maturity Model Integration, reflecting our advanced software development processes.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard compliance for handling payment card information.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    }
  ];

  const technologyPartners = [
    {
      name: "Microsoft Gold Partner",
      description: "Elite partnership status with Microsoft, demonstrating expertise across Microsoft technologies.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "AWS Advanced Consulting Partner",
      description: "Advanced partner status with Amazon Web Services, reflecting our cloud expertise.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "Google Cloud Partner",
      description: "Certified partnership with Google Cloud Platform for cloud solutions and services.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "Salesforce Consulting Partner",
      description: "Official consulting partnership with Salesforce for CRM implementation and customization.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "Adobe Solution Partner",
      description: "Certified partnership with Adobe for experience management and marketing solutions.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "IBM Business Partner",
      description: "Strategic partnership with IBM for enterprise solutions and services.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    }
  ];

  const industryPartners = [
    {
      name: "FinTech Alliance",
      description: "Membership in global financial technology alliance for industry collaboration and innovation.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "Healthcare Information and Management Systems Society (HIMSS)",
      description: "Membership in leading healthcare IT organization for knowledge sharing and best practices.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    },
    {
      name: "Retail Technology Consortium",
      description: "Active participation in collaborative retail technology initiatives and standards.",
      logo: "https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="Certifications & Partnerships"
        subtitle="Industry recognitions and strategic alliances that strengthen our service offerings"
        backgroundImage="https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Certifications</h2>
          <p className="text-lg mb-10">
            We maintain rigorous industry certifications that demonstrate our commitment to quality, security, and best practices in technology service delivery.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="flex bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="w-20 h-20 mr-6 flex-shrink-0">
                <img 
                  src={cert.logo} 
                  alt={cert.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                <p className="text-muted-foreground">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Technology Partners</h2>
          <p className="text-lg mb-10">
            We've established strategic partnerships with leading technology providers to deliver best-in-class solutions for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologyPartners.map((partner, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="h-16 mb-4 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{partner.name}</h3>
              <p className="text-muted-foreground text-center">{partner.description}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Industry Memberships</h2>
          <p className="text-lg mb-10">
            We actively participate in industry organizations to stay at the forefront of technology trends and contribute to industry advancement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {industryPartners.map((partner, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border/40">
              <div className="h-16 mb-4 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">{partner.name}</h3>
              <p className="text-muted-foreground text-center text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section-container bg-gray-50 dark:bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
          <p className="text-lg mb-8">
            Interested in exploring strategic partnership opportunities with TechSphere? We're always open to collaborations that create value for our clients.
          </p>
          <a href="/contact" className="inline-block bg-corporate-500 hover:bg-corporate-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
            Contact Our Partnership Team
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default CertificationsPartnerships;
