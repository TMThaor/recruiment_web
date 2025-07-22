import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Đội ngũ VIA đã vượt xa mong đợi của chúng tôi - chuyên nghiệp, sáng tạo và tận tâm. VIA Team đã mang đến những giải pháp xuất sắc, đã làm thay đổi thành công trong doanh nghiệp của chúng tôi.",
    author: "Mr. John Pjlaiky",
    position: "Tổng giám đốc, IT Solutions",
    image: "/assets/images/John_Pjlaiky.png",
  },
  {
    id: 2,
    quote:
      "VIA đã xây dựng nền tảng IoT của chúng tôi một cách hoàn hảo, thông minh, đáng tin cậy và có khả năng mở rộng. Chuyên môn của VIA Team đã biến tầm nhìn của chúng tôi thành một giải pháp kết nối mạnh mẽ.",
    author: "Mr. John Ding",
    position: "Giám đốc kỹ thuật",
    image: "/assets/images/John-Ding-Smile.avif",
  },
  {
    id: 3,
    quote:
      "Giải pháp AI của VIA cho nền tảng chăm sóc sức khỏe của chúng tôi đã cách mạng hóa cách quản lý dữ liệu bệnh nhân. Kiến thức kỹ thuật và sự am hiểu ngành y tế của Team thật ấn tượng.",
    author: "Dr. Cheong You Wei",
    position: "Giám đốc sáng tạo, HealthTech Solutions",
    image: "/assets/images/dr-cheong-you-wei.jpg",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Đánh giá từ khách hàng</h2>
          <p className="section-subtitle text-gray-400 mx-auto text-base">
            Lắng nghe những chia sẻ của khách hàng về những trải nghiệm làm việc
            cùng chúng tôi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative px-6 py-10 md:p-12 bg-gray-800 rounded-xl">
            <Quote className="absolute top-6 left-6 text-corporate-500 opacity-30 h-12 w-12" />

            <div
              key={testimonials[current].id}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/3">
                <div className="w-28 h-28 md:w-full md:h-auto rounded-full md:rounded-lg overflow-hidden aspect-square mx-auto md:mx-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <blockquote className="text-lg md:text-xl mb-6 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-lg">
                    {testimonials[current].author}
                  </p>
                  <p className="text-gray-400">
                    {testimonials[current].position}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-gray-900 px-3 py-2 rounded-full">
              <button
                onClick={prev}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full  ${
                    index === current ? "bg-brand-500" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}

              <button
                onClick={next}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
