
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  description: string;
  image: string;
  results: string[];
}

const ByService = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: "cms-educational",
      title: "Custom CMS for Educational Institution",
      client: "Leading University",
      industry: "Education",
      service: "CMS Development",
      description: "Developed a custom content management system to manage multiple departmental websites, faculty profiles, course listings, and publications.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop",
      results: [
        "90% faster content publishing workflow",
        "50% reduction in IT support requests",
        "Enabled self-service content management for 200+ departments"
      ]
    },
    {
      id: "cms-media",
      title: "Media Publishing Platform",
      client: "Digital News Network",
      industry: "Media",
      service: "CMS Development",
      description: "Created a scalable publishing platform handling thousands of articles, videos, and interactive content pieces with advanced categorization and search capabilities.",
      image: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?q=80&w=2070&auto=format&fit=crop",
      results: [
        "70% increase in publishing efficiency",
        "3x faster loading time for articles",
        "Seamless integration with multimedia content"
      ]
    },
    {
      id: "ecommerce-fashion",
      title: "Luxury Fashion E-Commerce Platform",
      client: "Premium Fashion Brand",
      industry: "Retail",
      service: "E-Commerce Solutions",
      description: "Built a high-end e-commerce platform featuring immersive product experiences, personalized recommendations, and seamless checkout process.",
      image: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?q=80&w=2071&auto=format&fit=crop",
      results: [
        "38% increase in conversion rate",
        "42% higher average order value",
        "65% improvement in mobile shopping experience"
      ]
    },
    {
      id: "ecommerce-b2b",
      title: "B2B E-Commerce Portal",
      client: "Industrial Supplies Distributor",
      industry: "Manufacturing",
      service: "E-Commerce Solutions",
      description: "Developed a comprehensive B2B e-commerce portal with account-specific pricing, bulk ordering, approval workflows, and integration with ERP systems.",
      image: "https://images.unsplash.com/photo-1567881963968-c55a78bdf496?q=80&w=2070&auto=format&fit=crop",
      results: [
        "54% of orders moved from phone/email to online",
        "30% reduction in order processing costs",
        "23% increase in reorder frequency"
      ]
    },
    {
      id: "blockchain-supply",
      title: "Supply Chain Transparency Solution",
      client: "Global Consumer Goods Manufacturer",
      industry: "Manufacturing",
      service: "Blockchain Development",
      description: "Implemented a blockchain-based supply chain tracking system to ensure ethical sourcing and provide transparency to consumers.",
      image: "https://images.unsplash.com/photo-1566287448920-55ba3da9c10c?q=80&w=2070&auto=format&fit=crop",
      results: [
        "Complete traceability from source to consumer",
        "65% increase in consumer trust metrics",
        "27% reduction in supply chain disputes"
      ]
    },
    {
      id: "blockchain-identity",
      title: "Secure Digital Identity Platform",
      client: "Financial Services Consortium",
      industry: "Fintech",
      service: "Blockchain Development",
      description: "Created a blockchain-based digital identity verification system allowing secure, privacy-preserving identity management across multiple financial institutions.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
      results: [
        "93% reduction in identity verification time",
        "88% decrease in identity fraud cases",
        "Saved $4.5M annually in compliance costs"
      ]
    },
    {
      id: "ai-healthcare",
      title: "AI Diagnostic Assistant",
      client: "Healthcare Technology Company",
      industry: "Healthcare",
      service: "AI & Machine Learning",
      description: "Developed an AI system that analyzes medical images to assist radiologists in detecting abnormalities with higher accuracy and efficiency.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      results: [
        "96% diagnostic accuracy rate",
        "30% reduction in analysis time",
        "15% increase in early detection of critical conditions"
      ]
    },
    {
      id: "ai-manufacturing",
      title: "Predictive Maintenance System",
      client: "Manufacturing Equipment Provider",
      industry: "Manufacturing",
      service: "AI & Machine Learning",
      description: "Created an AI-powered predictive maintenance system that monitors equipment health in real-time and predicts failures before they occur.",
      image: "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=2081&auto=format&fit=crop",
      results: [
        "72% reduction in unplanned downtime",
        "35% extension of equipment lifespan",
        "21% decrease in maintenance costs"
      ]
    },
    {
      id: "iot-smart-city",
      title: "Smart City Infrastructure",
      client: "Metropolitan Government",
      industry: "Government",
      service: "IoT Solutions",
      description: "Designed and implemented IoT infrastructure for urban management, including smart lighting, waste management, parking, and environmental monitoring.",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2064&auto=format&fit=crop",
      results: [
        "30% reduction in energy consumption",
        "40% improvement in waste collection efficiency",
        "25% decrease in traffic congestion"
      ]
    },
    {
      id: "iot-agriculture",
      title: "Precision Agriculture System",
      client: "Agricultural Enterprise",
      industry: "Agriculture",
      service: "IoT Solutions",
      description: "Developed an IoT solution for monitoring soil conditions, crop health, weather patterns, and automating irrigation to optimize agricultural production.",
      image: "https://images.unsplash.com/photo-1625246333195-78d73c0b7062?q=80&w=2070&auto=format&fit=crop",
      results: [
        "22% increase in crop yield",
        "35% reduction in water usage",
        "28% decrease in fertilizer costs"
      ]
    },
    {
      id: "digital-banking",
      title: "Digital Banking Transformation",
      client: "Regional Bank",
      industry: "Banking",
      service: "Digital Transformation",
      description: "Led complete digital transformation of a traditional bank, including mobile banking, digital onboarding, and modernization of core banking systems.",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop",
      results: [
        "65% increase in digital customer acquisition",
        "40% reduction in operational costs",
        "92% customer satisfaction with digital services"
      ]
    },
    {
      id: "digital-healthcare",
      title: "Healthcare Digital Transformation",
      client: "Hospital Network",
      industry: "Healthcare",
      service: "Digital Transformation",
      description: "Transformed patient experience and hospital operations through digital appointment systems, patient portals, and integrated healthcare management platforms.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2043&auto=format&fit=crop",
      results: [
        "75% reduction in appointment no-shows",
        "30% improvement in resource utilization",
        "4.8/5 patient satisfaction rating"
      ]
    }
  ];

  const services = [...new Set(caseStudies.map(study => study.service))];

  const CaseStudyCard = ({ study }: { study: CaseStudy }) => (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={study.image} 
          alt={study.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{study.title}</CardTitle>
        <CardDescription>{study.client} | {study.industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{study.description}</p>
        <div>
          <strong className="text-sm">Key Results:</strong>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
            {study.results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/case-studies/${study.id}`}>Read Full Case Study</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <PageHeader
        title="Case Studies by Service"
        subtitle="Explore our successful projects across different service areas"
        backgroundImage="https://images.unsplash.com/photo-1507208773393-40d9fc670acf?q=80&w=2074&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <Tabs defaultValue={services[0].toLowerCase().replace(/\s+/g, '-')} className="w-full">
          <div className="flex justify-center mb-8 flex-wrap">
            <TabsList className="flex-wrap">
              {services.map((service) => (
                <TabsTrigger key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                  {service}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {services.map((service) => (
            <TabsContent key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies
                  .filter(study => study.service === service)
                  .map((study) => (
                    <CaseStudyCard key={study.id} study={study} />
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
      
      <section className="section-container bg-gray-50 dark:bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Let's Create Your Success Story</h2>
          <p className="text-lg mb-8">
            Ready to achieve similar results for your business? Our team is eager to help you tackle your technology challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/case-studies/by-industry">View Cases by Industry</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ByService;
