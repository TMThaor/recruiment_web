import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: "fintech-blockchain",
    title:
      "Hệ thống thanh toán dựa trên Blockchain cho công ty khởi nghiệp FinTech",
    category: "Phát triển blockchain - chuỗi khối",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop",
    path: "/case-studies/fintech-blockchain",
  },
  {
    id: "ecommerce-platform",
    title: "Thiết kế nền tảng thương mại điện tử cho doanh nghiệp",
    category: "Nền tảng thương mại điện tử",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
    path: "/case-studies/ecommerce-redesign",
  },
  {
    id: "healthcare-ai",
    title: "Phát hiện gian lận bằng trí tuệ nhân tạo",
    category: "Trí tuệ nhân tạo và học máy",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    path: "/case-studies/healthcare-ai",
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="section-container" id="case-studies">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
        <div>
          <h2 className="section-title">Những câu chuyện thành công</h2>
          <p className="section-subtitle md:mb-0">
            Những kết quả thực tế mà chúng tôi đã mang lại cho khách hàng ở
            nhiều ngành nghề khác nhau
          </p>
        </div>
        <Button
          asChild
          variant="link"
          className="text-corporate-500 pl-0 flex items-center"
        >
          <Link to="/case-studies">
            Xem thêm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((study) => (
          <Link key={study.id} to={study.path} className="group">
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="bg-blue-100 rounded-sm px-2 mb-2 text-sm font-medium text-corporate-500 w-fit">
                  {study.category}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-500 transition-colors">
                  {study.title}
                </h3>
                <div className="flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem chi tiết <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
