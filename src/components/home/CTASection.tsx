import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-corporate-500 py-16 md:py-24">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Bạn đã sẵn sàng để chuyển mình trong kinh doanh chưa?
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Hợp tác cùng VIA Software Solutions để triển khai các giải pháp công
          nghệ sáng tạo, thúc đẩy tăng trưởng, nâng cao hiệu quả và tạo lợi thế
          cạnh tranh.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-corporate-700 hover:bg-gray-300"
          >
            <Link to="/contact">Bắt đầu ngay</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-corporate-700 hover:bg-gray-300"
          >
            <Link to="/services">Khám phá</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
