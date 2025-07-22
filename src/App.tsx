import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Website Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Service Pages
import CMSDevelopment from "./pages/services/CMSDevelopment";
import ECommerceSolutions from "./pages/services/ECommerceSolutions";
import BlockchainDevelopment from "./pages/services/BlockchainDevelopment";
import AIMachineLearning from "./pages/services/AIMachineLearning";
import IoTSolutions from "./pages/services/IoTSolutions";
import DigitalTransformation from "./pages/services/DigitalTransformation";

// About Pages
import CompanyOverview from "./pages/about/CompanyOverview";
import LeadershipTeam from "./pages/about/LeadershipTeam";
import OurValues from "./pages/about/OurValues";
import CertificationsPartnerships from "./pages/about/CertificationsPartnerships";

// Case Studies Pages
import ByIndustry from "./pages/case-studies/ByIndustry";
import ByService from "./pages/case-studies/ByService";

// Expertise Pages
import Technologies from "./pages/expertise/Technologies";
import Methodologies from "./pages/expertise/Methodologies";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import NewPost from "./pages/admin/NewPost";
import EditPost from "./pages/admin/EditPost";
import Media from "./pages/admin/Media";
import Settings from "./pages/admin/Settings";
import JobDetail from "./pages/jobDetail";
import JobPosts from "./pages/admin/JobPost";
import Categories from "./pages/admin/Categories";
import Staff from "./pages/admin/Staff";
import ManagerAccount from "./pages/admin/ManagerAccount";
import JobApplications from "./pages/admin/JobApplications";
import LoginPage from "./pages/Login";
import AppliedHistoryPage from "./pages/AppliedHistory";
import ContactManagement from "./pages/admin/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<Index />} />

          {/* Services Routes */}
          <Route path="/dich-vu" element={<Services />} />
          <Route
            path="/dich-vu/he-quan-tri-noi-dung"
            element={<CMSDevelopment />}
          />
          <Route
            path="/services/ecommerce-solutions"
            element={<ECommerceSolutions />}
          />
          <Route
            path="/services/blockchain-development"
            element={<BlockchainDevelopment />}
          />
          <Route
            path="/services/ai-machine-learning"
            element={<AIMachineLearning />}
          />
          <Route path="/services/iot-solutions" element={<IoTSolutions />} />
          <Route
            path="/services/digital-transformation"
            element={<DigitalTransformation />}
          />

          {/* About Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/company-overview" element={<CompanyOverview />} />
          <Route path="/about/leadership-team" element={<LeadershipTeam />} />
          <Route path="/about/our-values" element={<OurValues />} />
          <Route
            path="/about/certifications-partnerships"
            element={<CertificationsPartnerships />}
          />

          {/* Case Studies Routes */}
          <Route path="/case-studies/by-industry" element={<ByIndustry />} />
          <Route path="/case-studies/by-service" element={<ByService />} />

          {/* Expertise Routes */}
          <Route path="/expertise/technologies" element={<Technologies />} />
          <Route path="/expertise/methodologies" element={<Methodologies />} />

          {/* Other Main Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/job/:id" element={<JobDetail />}></Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/posts/new" element={<NewPost />} />
          <Route path="/admin/posts/edit/:id" element={<EditPost />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="/admin/jobs" element={<JobPosts />} />
          <Route path="/admin/media" element={<Media />} />
          <Route path="/admin/manager-account" element={<ManagerAccount />} />
          <Route path="/admin/contact" element={<ContactManagement />} />
          <Route
            path="/admin/jobs/:id/applications"
            element={<JobApplications />}
          />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/application-history" element={<AppliedHistoryPage />} />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
