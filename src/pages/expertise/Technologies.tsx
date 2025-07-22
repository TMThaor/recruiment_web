import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Technology {
  name: string;
  description: string;
  icon: string;
  level: "Chuyên gia" | "Trình độ cao" | "Thành thạo";
}

const Technologies = () => {
  const technologyCategories = [
    {
      category: "Giao diện người dùng",
      technologies: [
        {
          name: "React",
          description:
            "Xây dựng giao diện người dùng năng động và nhạy bén với React, Redux và React Router.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Angular",
          description:
            "Xây dựng các ứng dụng quy mô cấp doanh nghiệp với khuôn khổ giao diện người dùng và ngôn ngữ TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Vue.js",
          description:
            "Tạo giao diện web nhẹ và tiên tiến với hệ sinh thái Vue.js.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
          level: "Trình độ cao" as const,
        },
        {
          name: "Next.js",
          description:
            "Xây dựng các ứng dụng React được tối ưu hóa với khả năng kết xuất phía máy chủ và tạo trang web tĩnh.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Tailwind CSS",
          description:
            "Khung CSS tiện ích cung cấp kiểu dáng nhanh, thiết kế đáp ứng, bố cục nhất quán và khả năng phát triển giao diện người dùng có thể tùy chỉnh và bảo trì cao.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
          level: "Chuyên gia" as const,
        },
      ],
    },
    {
      category: "Xử lý phía máy chủ",
      technologies: [
        {
          name: "Node.js",
          description:
            "Xây dựng các hệ thống phụ trợ và API có khả năng mở rộng bằng Node.js và Express.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Java",
          description:
            "Phát triển các ứng dụng doanh nghiệp bằng Java, Spring Boot và Hibernate.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Python",
          description:
            "Tạo các dịch vụ phụ trợ và ứng dụng xử lý dữ liệu bằng Python, Django và Flask.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: ".NET",
          description:
            "Xây dựng các giải pháp doanh nghiệp với .NET Core, C# và ASP.NET.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
          level: "Trình độ cao" as const,
        },
        {
          name: "Go",
          description:
            "Ngôn ngữ lập trình nhanh, kiểu tĩnh, hỗ trợ xử lý đồng thời hiệu quả, đơn giản, hiệu năng cao, khả năng mở rộng tốt và dễ triển khai cho các ứng dụng hiện đại.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
          level: "Trình độ cao" as const,
        },
      ],
    },
    {
      category: "Cơ sở dữ liệu",
      technologies: [
        {
          name: "PostgreSQL",
          description:
            "Mã nguồn mở, đáng tin cậy, có khả năng mở rộng, bảo mật, hiệu năng cao, tuân thủ ACID, dễ mở rộng, hỗ trợ lập chỉ mục nâng cao, cú pháp SQL phong phú, hỗ trợ JSON, sao chép dữ liệu, cộng đồng mạnh mẽ, đa nền tảng, phân tích mạnh mẽ và cấp phép linh hoạt.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "MongoDB",
          description:
            "Xây dựng các giải pháp cơ sở dữ liệu NoSQL linh hoạt và có khả năng mở rộng với MongoDB.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "MySQL",
          description:
            "Mã nguồn mở, đáng tin cậy, nhanh, có khả năng mở rộng, an toàn, dễ sử dụng, đa nền tảng, hiệu suất cao, có thể sao chép, cộng đồng mạnh, tiết kiệm chi phí, tuân thủ ACID, linh hoạt, được hỗ trợ rộng rãi, sẵn sàng cho đám mây.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Redis",
          description:
            "Lưu trữ trong bộ nhớ, tốc độ cực nhanh, khả năng mở rộng cao, mã nguồn mở, hỗ trợ cấu trúc dữ liệu linh hoạt, lưu đệm (caching), phân tích thời gian thực, lưu trữ bền vững, cơ chế pub/sub, sao chép dữ liệu, tính sẵn sàng cao, độ trễ thấp, hỗ trợ phân cụm, dễ tích hợp, và nhẹ.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
          level: "Trình độ cao" as const,
        },
        {
          name: "Elasticsearch",
          description:
            "Tìm kiếm nhanh, lập chỉ mục thời gian thực, khả năng mở rộng cao, phân tán, phân tích dữ liệu, mã nguồn mở, tính sẵn sàng cao, truy vấn linh hoạt, giao tiếp qua API theo chuẩn REST, bảo mật, tổng hợp mạnh mẽ, tìm kiếm toàn văn, trực quan hóa, sẵn sàng cho đám mây và độ tin cậy cao.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
          level: "Trình độ cao" as const,
        },
      ],
    },
    {
      category: "Nền tảng đám mây",
      technologies: [
        {
          name: "AWS",
          description:
            "Có khả năng mở rộng, đáng tin cậy, an toàn, tiết kiệm chi phí, linh hoạt, cơ sở hạ tầng toàn cầu, triển khai nhanh, dịch vụ mở rộng, tính khả dụng cao, giải pháp được quản lý, đổi mới, tuân thủ, tự động hóa, hiệu suất, nhanh nhẹn.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Azure",
          description:
            "Nền tảng đám mây toàn diện cung cấp cơ sở hạ tầng có khả năng mở rộng, dịch vụ AI, công cụ DevOps, bảo mật và khả năng triển khai toàn cầu một cách liền mạch.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Google Cloud",
          description:
            "Khả năng mở rộng linh hoạt, bảo mật, tích hợp trí tuệ nhân tạo, đáng tin cậy, hạ tầng mạng toàn cầu, tiết kiệm chi phí, linh hoạt, triển khai nhanh, dịch vụ được quản lý, phân tích dữ liệu lớn, hỗ trợ đám mây lai, thúc đẩy đổi mới, tuân thủ quy định, tự động hóa và hiệu suất cao.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
          level: "Trình độ cao" as const,
        },
        {
          name: "CMS Cloud",
          description:
            "Đáng tin cậy, có khả năng mở rộng, bảo mật, tiết kiệm chi phí, linh hoạt, hiệu suất cao, hỗ trợ 24/7, hỗ trợ đa nền tảng đám mây, đảm bảo chủ quyền dữ liệu, triển khai nhanh, khả năng khôi phục sau thảm họa, tuân thủ quy định, dịch vụ được quản lý, thúc đẩy đổi mới và quản lý tập trung.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
          level: "Chuyên gia" as const,
        },
        {
          name: "Docker",
          description:
            "Nền tảng container nhẹ cho phép tạo ra môi trường nhất quán, triển khai nhanh, khả năng mở rộng và phát triển và phân phối ứng dụng hiệu quả.",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
          level: "Chuyên gia" as const,
        },
      ],
    },
  ];

  const TechnologyCard = ({ technology }: { technology: Technology }) => {
    const getLevelColor = (level: string) => {
      switch (level) {
        case "Chuyên gia":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "Trình độ cao":
          return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        case "Thành Thạo":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      }
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border/40 flex flex-col">
        <div className="flex items-center mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-3 mr-4">
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-8 h-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{technology.name}</h3>
            <Badge className={`${getLevelColor(technology.level)} mt-1`}>
              {technology.level}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground text-sm flex-grow">
          {technology.description}
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <PageHeader
        title="Chuyên môn công nghệ của chúng tôi"
        subtitle="Các công nghệ tiên tiến chúng tôi sử dụng để cung cấp các giải pháp, dịch vụ phát triển phần mềm"
        backgroundImage="/assets/images/techno.avif"
      />

      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Sử dụng đúng công nghệ để tạo lợi thế
          </h2>
          <p className="text-lg">
            Tại VIA, chúng tôi liên tục đánh giá, áp dụng và làm chủ những công
            nghệ hiệu quả nhất để giải quyết các thách thức kinh doanh phức tạp.
            Chuyên môn của chúng tôi trải rộng trên nhiều nền tảng công nghệ,
            cho phép chúng tôi lựa chọn công cụ phù hợp cho từng dự án cụ thể.
          </p>
        </div>

        <Tabs
          defaultValue={technologyCategories[0].category.toLowerCase()}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="flex-wrap">
              {technologyCategories.map((category) => (
                <TabsTrigger
                  key={category.category}
                  value={category.category.toLowerCase()}
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {technologyCategories.map((category) => (
            <TabsContent
              key={category.category}
              value={category.category.toLowerCase()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.technologies.map((tech, index) => (
                  <TechnologyCard key={index} technology={tech} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Continuous Learning & Innovation
              </h2>
              <p className="text-lg mb-4">
                Technology evolves rapidly, and staying at the cutting edge
                requires commitment to continuous learning and innovation. Our
                team actively participates in research, contributes to open
                source projects, and pursues ongoing education.
              </p>
              <p className="text-muted-foreground">
                Through our tech radar, innovation labs, and knowledge sharing
                practices, we ensure that we're always prepared to leverage the
                most appropriate technologies for our clients' evolving needs.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=2070&auto=format&fit=crop"
                alt="Innovation Lab"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default Technologies;
