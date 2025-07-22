import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold">
                <span className="text-corporate-500">
                  VIA Software Solutions
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Cung cấp dịch vụ gia công CNTT cao cấp cho các doanh nghiệp trên
              toàn cầu. Biến ý tưởng thành những trải nghiệm số vượt trội.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-corporate-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-corporate-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-corporate-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-corporate-500 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/cms-development"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Hệ quản trị nội dung
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ecommerce-solutions"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Nền tảng thương mại điện tử
                </Link>
              </li>
              <li>
                <Link
                  to="/services/blockchain-development"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Phát triển blockchain - chuỗi khối
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ai-machine-learning"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Trí tuệ nhân tạo và học máy
                </Link>
              </li>
              <li>
                <Link
                  to="/services/iot-solutions"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Giải pháp IoT - Internet vạn vật
                </Link>
              </li>
              <li>
                <Link
                  to="/services/digital-transformation"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Giải pháp chuyển đổi số
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Công ty</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about/company-overview"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="case-studies/by-service"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Dự án theo ngành nghề
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/by-industry"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Dự án theo dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/expertise/technologies"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Công nghệ tại VIA
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Tin tức & Công nghệ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-corporate-500 mt-0.5" />
                <span className="text-muted-foreground mb-2">
                  Số 16 Ngõ 204 Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội, Việt
                  Nam
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-corporate-500 mt-0.5" />
                <span className="text-muted-foreground mb-2">
                  No. 8/36, Unitt Street, Melton Victoria, Australia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-corporate-500" />
                <a
                  href="tel:+84 33 234 1089"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  +84 33 234 1089
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-corporate-500" />
                <a
                  href="mailto:contact@viajsc.onmicrosoft.com"
                  className="text-muted-foreground hover:text-corporate-500 transition-colors"
                >
                  contact@viajsc.onmicrosoft.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} VIA Software Solutions. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
            <Link
              to="/privacy-policy"
              className="text-muted-foreground hover:text-corporate-500 transition-colors"
            >
              Privacy Policy
            </Link>
            {/* <Link
              to="/terms-of-service"
              className="text-muted-foreground hover:text-corporate-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-muted-foreground hover:text-corporate-500 transition-colors"
            >
              Cookies Policy
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
