import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const LeadershipTeam = () => {
  const executiveTeam: TeamMember[] = [
    {
      name: "Michael Thompson",
      position: "Chief Executive Officer",
      bio: "With over 20 years of experience in technology leadership, Michael has led TechSphere from its inception to become a global IT services provider. Prior to founding TechSphere, he held executive positions at several Fortune 500 technology companies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael.thompson@techsphere.com"
      }
    },
    {
      name: "Sarah Chen",
      position: "Chief Technology Officer",
      bio: "Sarah brings deep technical expertise in software architecture, cloud computing, and emerging technologies. She leads our technology strategy and innovation initiatives, ensuring TechSphere remains at the cutting edge of technology solutions.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.chen@techsphere.com"
      }
    },
    {
      name: "David Rodriguez",
      position: "Chief Operating Officer",
      bio: "David oversees TechSphere's global operations, ensuring efficient delivery of services to our clients. His background in management consulting and operational excellence has helped scale our service delivery across multiple regions.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david.rodriguez@techsphere.com"
      }
    },
    {
      name: "Emily Nguyen",
      position: "Chief Marketing Officer",
      bio: "Emily leads our global marketing strategy, brand development, and client acquisition initiatives. Her innovative approach to technology marketing has been instrumental in establishing TechSphere's brand in competitive markets.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily.nguyen@techsphere.com"
      }
    }
  ];

  const seniorLeaders: TeamMember[] = [
    {
      name: "Robert Kim",
      position: "VP, Blockchain Solutions",
      bio: "Robert leads our blockchain practice, bringing expertise in distributed ledger technologies and their application across various industries. He has led numerous blockchain implementations for financial services and supply chain clients.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop",
      social: {
        linkedin: "#",
        email: "robert.kim@techsphere.com"
      }
    },
    {
      name: "Priya Patel",
      position: "VP, AI & Machine Learning",
      bio: "Priya directs our AI and machine learning initiatives, combining academic expertise with practical industry experience. Her team develops cutting-edge AI solutions that deliver measurable business value.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop",
      social: {
        linkedin: "#",
        email: "priya.patel@techsphere.com"
      }
    },
    {
      name: "Thomas Weber",
      position: "VP, E-Commerce Solutions",
      bio: "Thomas brings extensive experience in e-commerce platform development and digital retail strategy. He helps retail and B2B clients transform their digital commerce capabilities to meet evolving customer expectations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
      social: {
        linkedin: "#",
        email: "thomas.weber@techsphere.com"
      }
    },
    {
      name: "Lisa Johnson",
      position: "VP, Client Success",
      bio: "Lisa ensures our clients achieve their business objectives through our technology solutions. She oversees our client success teams, focusing on long-term client relationships and value delivery.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop",
      social: {
        linkedin: "#",
        email: "lisa.johnson@techsphere.com"
      }
    }
  ];

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-border/40">
      <div className="aspect-[4/5] relative">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-corporate-500 font-medium mb-4">{member.position}</p>
        <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
        <div className="flex space-x-4">
          {member.social.linkedin && (
            <a href={member.social.linkedin} className="text-muted-foreground hover:text-corporate-500 transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} className="text-muted-foreground hover:text-corporate-500 transition-colors">
              <Twitter size={18} />
            </a>
          )}
          {member.social.email && (
            <a href={`mailto:${member.social.email}`} className="text-muted-foreground hover:text-corporate-500 transition-colors">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <PageHeader
        title="Leadership Team"
        subtitle="Meet the experienced professionals guiding our company"
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Executive Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our executive team brings decades of combined experience in technology, business strategy, and industry expertise to guide TechSphere's vision and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveTeam.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </section>
      
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Senior Leadership</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our senior leaders drive innovation and excellence across our practice areas, bringing deep domain expertise and industry experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seniorLeaders.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </section>
      
      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg mb-8">
            We're always looking for talented individuals to join our growing team. Explore our open positions and become part of our mission to transform businesses through technology.
          </p>
          <Button asChild size="lg">
            <Link to="/careers">View Career Opportunities</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LeadershipTeam;
