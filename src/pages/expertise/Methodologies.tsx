
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Methodologies = () => {
  const methodologies = [
    {
      name: "Agile Development",
      description: "We apply Agile methodologies including Scrum and Kanban to deliver software incrementally, allowing for greater flexibility, faster time-to-market, and continuous improvement based on feedback.",
      benefits: [
        "Iterative development with continuous feedback",
        "Adaptability to changing requirements",
        "Faster delivery of business value",
        "Greater collaboration and transparency"
      ],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "DevOps",
      description: "Our DevOps practices bridge the gap between development and operations, creating a culture and environment for building, testing, and releasing software rapidly, frequently, and more reliably.",
      benefits: [
        "Faster delivery cycles and time-to-market",
        "Improved collaboration between teams",
        "Enhanced stability and reliability",
        "Automated testing and deployment"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "CI/CD",
      description: "Continuous Integration and Continuous Delivery are cornerstone practices in our development process, ensuring code is automatically built, tested, and prepared for deployment to any environment.",
      benefits: [
        "Reduced integration issues",
        "Faster feedback on changes",
        "Consistent and reliable deployments",
        "Higher code quality through automated testing"
      ],
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Design Thinking",
      description: "We apply Design Thinking principles to understand users, challenge assumptions, redefine problems, and create innovative solutions that address real user needs and deliver tangible business value.",
      benefits: [
        "Deep understanding of user needs",
        "Innovative solutions to complex problems",
        "Reduced risk of building the wrong product",
        "Enhanced user experiences and satisfaction"
      ],
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Domain-Driven Design",
      description: "For complex projects, we utilize Domain-Driven Design to create software deeply aligned with the business domain, focusing on core domain logic and the model-driven design approach.",
      benefits: [
        "Software aligned with business needs",
        "Better handling of complex domains",
        "Improved communication between technical and domain experts",
        "Flexible and maintainable architecture"
      ],
      image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Test-Driven Development",
      description: "TDD is fundamental to our engineering practice, where tests are written before code implementation to ensure high code quality, better design, and comprehensive test coverage.",
      benefits: [
        "Higher code quality and fewer bugs",
        "Better software design and architecture",
        "Comprehensive test coverage",
        "Faster and safer refactoring"
      ],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
    }
  ];
  
  return (
    <Layout>
      <PageHeader
        title="Our Methodologies"
        subtitle="The proven practices and principles that guide our work"
        backgroundImage="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2069&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">How We Work</h2>
          <p className="text-lg">
            At TechSphere, we combine industry-leading methodologies with our own proven practices to deliver exceptional results for our clients. Our approach is focused on efficiency, quality, and value creation.
          </p>
        </div>
        
        <div className="space-y-16">
          {methodologies.map((methodology, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <h2 className="text-3xl font-bold mb-6">{methodology.name}</h2>
                <p className="text-lg mb-6">{methodology.description}</p>
                <h3 className="text-xl font-semibold mb-4">Key Benefits:</h3>
                <ul className="space-y-3">
                  {methodology.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-corporate-500 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <img 
                  src={methodology.image} 
                  alt={methodology.name} 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Customized Approach</h2>
          <p className="text-lg mb-8">
            While we adhere to established methodologies, we understand that every project is unique. We tailor our approach to meet the specific needs, constraints, and objectives of each client engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Methodologies;
