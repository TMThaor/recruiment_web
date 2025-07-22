import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const heroBackgrounds = [
  "bg-[url('/assets/images/slide1.avif')] bg-cover bg-center",
  "bg-[url('/assets/images/slide2.avif')] bg-cover bg-center",
  "bg-[url('/assets/images/slide3.avif')] bg-cover bg-center",
  "bg-[url('/assets/images/slide4.avif')] bg-cover bg-center",
];

const textContent = [
  {
    heading: "Một điểm chạm cho mọi dịch vụ Công nghệ",
    subheading:
      "VIA cung cấp đầy đủ dịch vụ Công nghệ thông tin hiện đại, chuyên nghiệp, toàn diện, hiệu quả và linh hoạt.",
  },
  {
    heading: "Chuyển đổi mô hình kinh doanh áp dụng công nghệ",
    subheading:
      "Các giải pháp gia công CNTT sáng tạo được xây dựng riêng cho những thách thức kinh doanh riêng biệt của doanh nghiệp",
  },
  {
    heading: "Xây dựng các giải pháp số vượt trội",
    subheading:
      "Dịch vụ phát triển toàn diện bởi các chuyên gia có kinh nghiệm để đẩy nhanh quá trình phát triển của doanh nghiệp",
  },
  {
    heading: "Thúc đẩy hành trình số của doanh nghiệp",
    subheading:
      "Từ Blockchain đến AI, chúng tôi mang đến những giải pháp tiên tiến giúp doanh nghiệp đạt hiệu quả thực sự.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[75vh]">
      {/* Background Images */}
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          } ${bg}`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative h-full container px-4 mx-auto flex flex-col justify-center items-center text-white text-center">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {textContent[current].heading}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {textContent[current].subheading}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-corporate-500 hover:bg-corporate-600"
            >
              <Link to="/services">Dịch vụ của chúng tôi</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white/70"
            >
              <Link to="/contact">Liên hệ</Link>
            </Button>
          </div>
        </motion.div>

        {/* Indicators */}
        <div className="absolute bottom-12 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-8 bg-corporate-500" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
