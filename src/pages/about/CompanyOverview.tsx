import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CompanyOverview = () => {
  return (
    <Layout>
      <PageHeader
        title="VIA Software Solutions"
        subtitle="Đối tác đáng tin cậy của bạn trong chuyển đổi số và đổi mới phần mềm"
        backgroundImage="/assets/images/companyoverview.avif"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Chúng Tôi Là Ai
          </h2>
          <div className=" p-6 rounded-lg">
            <p className="mb-4 text-gray-700">
              VIA là công ty gia công phần mềm cam kết xuất sắc trong các lĩnh
              vực:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Phát triển phần mềm tùy chỉnh</strong>: Từ ý tưởng đến
                triển khai, chúng tôi xây dựng ứng dụng phù hợp để giải quyết
                các thách thức kinh doanh của bạn.
              </li>
              <li>
                <strong>Chuyển đổi số</strong>: Chúng tôi đồng hành cùng doanh
                nghiệp hiện đại hóa hệ thống, tự động hóa quy trình và khai thác
                dữ liệu.
              </li>
              <li>
                <strong>Giải pháp Blockchain</strong>: Phát triển ứng dụng
                blockchain an toàn, hợp đồng thông minh và marketplace NFT.
              </li>
              <li>
                <strong>Giải pháp IoT</strong>: Kết nối thiết bị và dữ liệu để
                giám sát, phân tích và tối ưu quy trình thời gian thực.
              </li>
              <li>
                <strong>AI & Học máy</strong>: Xây dựng hệ thống thông minh tự
                động hóa quyết định, cá nhân hóa trải nghiệm khách hàng và dự
                đoán kết quả.
              </li>
              <li>
                <strong>Thương mại điện tử & CMS</strong>: Thiết kế nền tảng số
                mở rộng giúp bạn tiếp cận khách hàng.
              </li>
              <li>
                <strong>Giải pháp ERP</strong>: Triển khai và tùy chỉnh hệ thống
                ERP tích hợp tài chính, bán hàng và chuỗi cung ứng.
              </li>
            </ul>
            <p className="mt-4 text-gray-700">
              Với nhiều năm kinh nghiệm và đội ngũ kỹ sư lành nghề, VIA đã triển
              khai thành công dự án cho khách hàng tại Mỹ, Anh, Malaysia, Việt
              Nam, Nhật Bản, Singapore và nhiều nước khác.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Điểm Khác Biệt Của VIA
          </h2>
          <div className=" p-6 rounded-lg">
            <p className="mb-4 text-gray-700">
              Tại VIA, chúng tôi hiểu công nghệ không chỉ là công cụ - mà là
              giúp doanh nghiệp của bạn phát triển. Lý do khách hàng chọn chúng
              tôi:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">
                  Năng lực toàn diện
                </h3>
                <p>
                  Từ tư vấn, thiết kế đến phát triển và bảo trì, chúng tôi đảm
                  nhiệm toàn bộ vòng đời dự án.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">
                  Chuyên môn đa dạng
                </h3>
                <p>
                  Ứng dụng cloud-native, tích hợp blockchain, phân tích AI hay
                  hệ thống ERP doanh nghiệp.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">
                  Phương pháp linh hoạt
                </h3>
                <p>
                  Làm việc chặt chẽ với khách hàng, lặp nhanh và đảm bảo giải
                  pháp phù hợp mục tiêu kinh doanh.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">
                  Cam kết chất lượng
                </h3>
                <p>
                  Kết hợp chuẩn phát triển nghiêm ngặt với thực hành bảo mật
                  hàng đầu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sứ Mệnh Của Chúng Tôi
          </h2>
          <div className=" p-6 rounded-lg">
            <blockquote className="text-xl italic font-semibold text-gray-700 mb-4">
              "Sứ mệnh của VIA rất đơn giản: Giúp doanh nghiệp thành công bằng
              cách khai thác sức mạnh của phần mềm và công nghệ số."
            </blockquote>
            <p className="text-gray-700">
              Chúng tôi tin vào việc xây dựng quan hệ đối tác lâu dài dựa trên
              niềm tin, minh bạch và tác động đo lường được. Thành công của bạn
              là thành công của chúng tôi.
            </p>
          </div>
        </section>

        <section>
          <div className=" py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Title Section */}
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  Hiện Diện Toàn Cầu
                </h3>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text */}
                <div className="space-y-6">
                  <p className="text-lg text-gray-700">
                    With offices in Australia and Vietnam, our global footprint
                    allows us to serve clients around the world while providing
                    access to top technical talent across different regions.
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">
                      Với văn phòng tại Úc và Việt Nam
                    </span>
                    , phạm vi toàn cầu của chúng tôi cho phép phục vụ khách hàng
                    trên khắp thế giới đồng thời tiếp cận nguồn nhân tài kỹ
                    thuật hàng đầu từ nhiều khu vực.
                  </p>
                  <p className="text-lg text-gray-700">
                    Our diverse team includes over 50 professionals and more
                    than 20 contractors, bringing together varied perspectives
                    and expertise to solve our clients' most challenging
                    problems.
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Đội ngũ đa dạng</span> gồm
                    hơn 50 chuyên gia và 20+ cộng tác viên, mang đến nhiều góc
                    nhìn và chuyên môn để giải quyết những thách thức phức tạp
                    nhất của khách hàng.
                  </p>
                </div>

                {/* Right Column - Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Row 1 */}
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      95%
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      Tỷ lệ giữ chân KH
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      10+
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      Năm xuất sắc
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      200+
                    </div>
                    <div className="text-gray-500 text-sm mt-1">Dự án</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      2
                    </div>
                    <div className="text-gray-500 text-sm mt-1">Văn phòng</div>
                  </div>

                  {/* Row 3 */}
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      8+
                    </div>
                    <div className="text-gray-500 text-sm mt-1">Quốc gia</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm text-center border border-gray-100">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      50+
                    </div>
                    <div className="text-gray-500 text-sm mt-1">Chuyên gia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CompanyOverview;
