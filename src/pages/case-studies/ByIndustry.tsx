
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

const ByIndustry = () => {
  const caseStudies: CaseStudy[] = [
    {
      id: "healthcare-ehr",
      title: "Modern EHR System Integration",
      client: "Regional Healthcare Network",
      industry: "Healthcare",
      service: "Digital Transformation",
      description: "Developed and implemented a modern Electronic Health Record system that integrated with existing healthcare systems, improving patient care and operational efficiency.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      results: [
        "40% reduction in administrative time",
        "60% faster access to patient records",
        "98% physician satisfaction rate"
      ]
    },
    {
      id: "healthcare-telemedicine",
      title: "Telemedicine Platform",
      client: "National Healthcare Provider",
      industry: "Healthcare",
      service: "Custom Software Development",
      description: "Designed and built a secure, HIPAA-compliant telemedicine platform enabling remote consultations and monitoring for patients with chronic conditions.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
      results: [
        "250,000 virtual consultations in first year",
        "35% increase in patient access to specialists",
        "28% reduction in missed appointments"
      ]
    },
    {
      id: "fintech-blockchain",
      title: "Blockchain-Based Payment Solution",
      client: "International Financial Services Firm",
      industry: "Fintech",
      service: "Blockchain Development",
      description: "Developed a blockchain-based cross-border payment solution that reduced transaction times and costs while enhancing security and transparency.",
      image: "https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?q=80&w=2072&auto=format&fit=crop",
      results: [
        "90% reduction in settlement time",
        "75% cost savings on international transfers",
        "100% transaction traceability"
      ]
    },
    {
      id: "fintech-ai",
      title: "AI-Powered Fraud Detection",
      client: "Global Payment Processor",
      industry: "Fintech",
      service: "AI & Machine Learning",
      description: "Implemented an advanced AI system that analyzes transaction patterns in real-time to detect and prevent fraudulent activities across multiple channels.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
      results: [
        "85% reduction in false positives",
        "63% increase in fraud detection rate",
        "$12M in prevented fraud losses in first year"
      ]
    },
    {
      id: "retail-ecommerce",
      title: "Omnichannel Retail Platform",
      client: "Multinational Retail Chain",
      industry: "Retail",
      service: "E-Commerce Solutions",
      description: "Created a comprehensive omnichannel retail platform that unified online and in-store experiences, inventory management, and customer data.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
      results: [
        "45% increase in online sales",
        "32% improvement in inventory turnover",
        "27% higher customer retention rate"
      ]
    },
    {
      id: "retail-analytics",
      title: "Retail Analytics Dashboard",
      client: "Fashion Retailer",
      industry: "Retail",
      service: "Data Analytics",
      description: "Developed a comprehensive analytics platform providing real-time insights into sales patterns, inventory optimization, and customer behavior.",
      image: "https://images.unsplash.com/photo-1475650522725-015d35677200?q=80&w=2070&auto=format&fit=crop",
      results: [
        "22% reduction in excess inventory",
        "18% increase in average transaction value",
        "Better merchandising decisions with 95% accuracy"
      ]
    }
  ];

  const industries = [...new Set(caseStudies.map(study => study.industry))];

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
        <CardDescription>{study.client} | {study.service}</CardDescription>
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
        title="Case Studies by Industry"
        subtitle="Explore our successful projects across different industries"
        backgroundImage="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=2070&auto=format&fit=crop"
      />
      
      <section className="section-container">
        <Tabs defaultValue={industries[0].toLowerCase()} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {industries.map((industry) => (
                <TabsTrigger key={industry} value={industry.toLowerCase()}>
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {industries.map((industry) => (
            <TabsContent key={industry} value={industry.toLowerCase()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies
                  .filter(study => study.industry === industry)
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
          <Button asChild size="lg">
            <Link to="/contact">Discuss Your Project</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ByIndustry;
