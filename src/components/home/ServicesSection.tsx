import { Link } from "react-router-dom";
import {
  Code,
  ShoppingBag,
  Database,
  Brain,
  Wifi,
  BarChartBig,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "cms",
    title: "Hệ quản trị nội dung",
    description:
      "Chúng tôi xây dựng các giải pháp CMS tùy chỉnh giúp bạn dễ dàng quản lý nội dung, tăng cường tương tác và mở rộng sự hiện diện số của bạn.",
    icon: <Code className="h-10 w-10 text-brand-400" />,
    path: "/dich-vu/he-quan-tri-noi-dung",
  },
  {
    id: "ecommerce",
    title: "Nền tảng thương mại điện tử",
    description:
      "Chúng tôi xây dựng các giải pháp thương mại điện tử mạnh mẽ với hệ thống thanh toán an toàn, thiết kế tùy chỉnh và tích hợp mượt mà nhằm thúc đẩy doanh số và tăng cường sự trung thành của khách hàng.",
    icon: <ShoppingBag className="h-10 w-10 text-brand-400" />,
    path: "/services/ecommerce-solutions",
  },
  {
    id: "blockchain",
    title: "Phát triển Blockchain - chuỗi khối",
    description:
      "Chúng tôi thiết kế các giải pháp blockchain an toàn, cơ chế tự động hóa khi giao dịch, hệ thống ứng dụng phân tán nhằm tối ưu hóa quy trình vận hành và xây dựng niềm tin trong toàn bộ hệ sinh thái của bạn.",
    icon: <Database className="h-10 w-10 text-brand-400" />,
    path: "/services/blockchain-development",
  },
  {
    id: "ai",
    title: "Trí tuệ nhân tạo và học máy",
    description:
      "Chúng tôi phát triển các giải pháp trí tuệ nhân tạo và học máy giúp tự động hóa các quyết định, khai thác dữ liệu chuyên sâu và thúc đẩy kết quả kinh doanh thông minh, nhanh chóng hơn.",
    icon: <Brain className="h-10 w-10 text-brand-400" />,
    path: "/services/ai-machine-learning",
  },
  {
    id: "iot",
    title: "Giải pháp IoT -Internet vạn vật",
    description:
      "Chúng tôi tạo ra các giải pháp IoT thông minh kết nối thiết bị, thu thập dữ liệu thời gian thực và tự động hóa quy trình nhằm tối ưu hóa hoạt động và thúc đẩy đổi mới sáng tạo.",
    icon: <Wifi className="h-10 w-10 text-brand-400" />,
    path: "/services/iot-solutions",
  },
  {
    id: "digital-transformation",
    title: "Giải pháp chuyển đổi số",
    description:
      "Chúng tôi giúp các tổ chức hiện đại hóa quy trình, tích hợp công nghệ đổi mới và thúc đẩy tăng trưởng thông qua các giải pháp chuyển đổi số toàn diện, theo chiến lược.",
    icon: <BarChartBig className="h-10 w-10 text-brand-400" />,
    path: "/services/digital-transformation",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-container" id="services">
      <div className="text-center mb-12">
        <h2 className="section-title">Các dịch vụ chính</h2>
        <p className="section-subtitle mx-auto">
          Các giải pháp công nghệ thông tin được thiết kế riêng để giải quyết
          các thách thức của doanh nghiệp và thúc đẩy sự phát triển toàn diện.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border border-border/40 hover:border-corporate-200 transition-all hover:shadow-md"
          >
            <CardHeader>
              <div className="mb-4">{service.icon}</div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground mb-6">
                {service.description}
              </CardDescription>
              <Button
                variant="outline"
                asChild
                className="text-corporate-500 border-corporate-500 hover:bg-corporate-50 hover:text-corporate-600"
              >
                <Link to={service.path}>Xem thêm</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          asChild
          size="lg"
          className="bg-corporate-500 hover:bg-corporate-600"
        >
          <Link to="/services">Xem tất cả dịch vụ</Link>
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;
