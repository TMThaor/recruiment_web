import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { value: "10+", label: "Năm kinh nghiệm" },
    { value: "200+", label: "Dự án hoàn thành" },
    { value: "50+", label: "Lập trình viên chuyên nghiệp" },
    { value: "30+", label: "Khách hàng quốc tế" },
  ];

  const keyPoints = [
    "Đội ngũ kỹ sư chuyên nghiệp với kinh nghiệm đa dạng trong ngành",
    "Kết hợp với các Thạc sĩ, Tiến sĩ chuyên nghành CNTT cùng nghiên cứu, phát triển các công nghệ mới",
    "Liên kết chặt chẽ với các trường Đại học trong nước kết hợp xây dựng nguồn nhân lực chất lượng cao",
    "Phương pháp phát triển Agile giúp rút ngắn thời gian đưa sản phẩm ra thị trường",
    "Tập trung vào bảo mật, khả năng mở rộng và hiệu suất",
    "Giao tiếp minh bạch và quản lý dự án hiệu quả",
    "Hỗ trợ sau khi triển khai 24/7 và cải tiến liên tục",
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">
              Đối tác công nghệ tin cậy và lâu dài của các doanh nghiệp toàn cầu
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              VIA tự hào cung cấp các dịch vụ công nghệ thông tin cao cấp với
              trọng tâm là chất lượng, đổi mới và tối ưu. Đội ngũ kĩ sư chuyên
              nghiệp của chúng tôi giúp khách hàng tự tin vượt qua hành trình
              chuyển đổi số.
            </p>

            <div className="space-y-3 mb-8">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-corporate-500 mt-1 flex-shrink-0" />
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <Button asChild className="bg-corporate-500 hover:bg-corporate-600">
              <Link to="/about/company-overview">Tìm hiểu thêm về VIA</Link>
            </Button>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-border/30"
                >
                  <h3 className="text-4xl font-bold text-corporate-500 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
              <div className="col-span-2">
                <div className="bg-corporate-500 text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    Bạn đã sẵn sàng bắt đầu dự án của mình chưa?
                  </h3>
                  <p className="mb-4">
                    Liên hệ với chúng tôi ngay hôm nay để được tư vấn và báo giá
                    miễn phí.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white text-black hover:bg-gray-300"
                  >
                    <Link to="/contact">Liên hệ</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
