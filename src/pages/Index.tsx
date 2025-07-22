
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import Layout from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
