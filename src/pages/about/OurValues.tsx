
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OurValues = () => {
  const values = [
    {
      title: "Client Success",
      description: "We measure our success by the success of our clients. We're committed to delivering solutions that create real value and help our clients achieve their business objectives.",
      icon: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=987&auto=format&fit=crop"
    },
    {
      title: "Technical Excellence",
      description: "We strive for technical excellence in everything we do, maintaining the highest standards of quality, performance, and innovation in our solutions.",
      icon: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop"
    },
    {
      title: "Continuous Innovation",
      description: "We embrace change and continuously seek new ways to solve problems, improve our services, and create value through technology innovation.",
      icon: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop"
    },
    {
      title: "Diversity & Inclusion",
      description: "We believe diverse perspectives drive better solutions. We foster an inclusive environment where everyone can contribute their unique talents and experiences.",
      icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop"
    },
    {
      title: "Integrity",
      description: "We act with honesty, transparency, and ethical responsibility in all our interactions with clients, partners, and employees.",
      icon: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop"
    },
    {
      title: "Collaborative Partnership",
      description: "We work as true partners with our clients, building long-term relationships based on mutual trust, respect, and shared success.",
      icon: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      <PageHeader
        title="Our Values"
        subtitle="The principles that guide our work and shape our culture"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">What We Stand For</h2>
          <p className="text-lg">
            At TechSphere, our values represent who we are and how we work. They guide our decisions, shape our culture, and define our approach to creating technology solutions that make a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-border/40">
              <div className="h-48 overflow-hidden">
                <img 
                  src={value.icon} 
                  alt={value.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
            <p className="text-lg mb-4">
              Our values aren't just words on a wall—they're principles that shape our workplace culture and guide our daily actions. At TechSphere, we've built a culture that celebrates innovation, collaboration, and continuous learning.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe in creating an environment where talented people can do their best work, develop their skills, and build meaningful careers while making a positive impact for our clients.
            </p>
            <p className="text-muted-foreground">
              From regular hackathons and knowledge sharing sessions to community service initiatives and team-building activities, we cultivate a vibrant culture that brings our values to life.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop" 
              alt="TechSphere Culture" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      
      <section className="section-container text-center">
        <h2 className="text-3xl font-bold mb-6">Join a Team That Shares Your Values</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          If our values resonate with you, consider joining our team of dedicated professionals who are passionate about technology and making a difference.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <Link to="/careers">Explore Careers</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/about/company-overview">Learn More About Us</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OurValues;
