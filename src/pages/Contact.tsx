import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CollaborationForm } from "@/components/shared/CollaborationForm";
import { RecruitmentContactForm } from "@/components/shared/RecruitmentContactForm";

const Contact = () => {
  const [activeForm, setActiveForm] = useState<"collaboration" | "recruitment">(
    "collaboration"
  );

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-corporate-500" />,
      title: "Email",
      details: ["contact@viajsc.onmicrosoft.com", "huyphan@viajsc.com"],
    },
    {
      icon: <Phone className="h-6 w-6 text-corporate-500" />,
      title: "Số điện thoại",
      details: ["+84 906 309 886"],
    },
    {
      icon: <MapPin className="h-6 w-6 text-corporate-500" />,
      title: "Văn phòng",
      details: [
        "No 16, 204 Alley, Tran Duy Hung Street,",
        "Cau Giay District, Ha Noi City",
      ],
    },
    {
      icon: <Clock className="h-6 w-6 text-corporate-500" />,
      title: "Giờ làm việc",
      details: ["Thứ 2 - Thứ 6: 8am - 6pm", "Cuối tuần: Đóng cửa"],
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Liên hệ với chúng tôi ngay"
        subtitle="Hãy kết nối với đội ngũ của chúng tôi để được hỗ trợ."
        backgroundImage="/assets/images/contactus.avif"
      />

      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Liên hệ ngay</h2>
            <p className="text-muted-foreground mb-8">
              Bạn có câu hỏi hoặc sẵn sàng bắt đầu dự án của mình? Hãy liên hệ
              với chúng tôi ngay hôm nay để được tư vấn và báo giá miễn phí.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border border-border/40">
                  <CardContent className="p-6 flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg border border-border shadow-sm">
            <div className="flex space-x-4 mb-6">
              <Button
                variant={activeForm === "collaboration" ? "default" : "outline"}
                onClick={() => setActiveForm("collaboration")}
              >
                Yêu cầu hợp tác
              </Button>
              <Button
                variant={activeForm === "recruitment" ? "default" : "outline"}
                onClick={() => setActiveForm("recruitment")}
              >
                Ứng tuyển
              </Button>
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              {activeForm === "collaboration"
                ? "Gửi yêu cầu hợp tác cho chúng tôi"
                : "Đặt câu hỏi về tuyển dụng"}
            </h2>

            {activeForm === "collaboration" ? (
              <CollaborationForm />
            ) : (
              <RecruitmentContactForm />
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 mx-auto ">
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-2/3"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=S%E1%BB%91%2016%20Ng.%20204%20Tr%E1%BA%A7n%20Duy%20H%C6%B0ng%2C%20Trung%20Ho%C3%A0%2C%20C%E1%BA%A7u%20Gi%E1%BA%A5y%2C%20H%C3%A0%20N%E1%BB%99i%2C%20Vietnam&amp;output=embed"
              title="Google Map - Số 16 Ng. 204 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội, Vietnam"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
