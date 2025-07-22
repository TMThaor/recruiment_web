import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { jobPostApiService } from "@/api/job-post-api.service";
import { Link } from "react-router-dom";

export interface JobPosting {
  id: string;
  category_id: string;
  title: string;
  description: string;
  requirements: string;
  benefits: string;
  quantity: number;
  location: string;
  experienceRequired: number;
  jobType: string;
  skills: string;
  minSalary: number | null;
  maxSalary: number | null;
  level: string;
  created_at: string;
  category: {
    id: string;
    name: string;
    created_at: string;
  };
}
const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  const getAllJobPost = async () => {
    try {
      const res = await jobPostApiService.getAllJobPosts();
      if (res) {
        setJobPostings(res);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllJobPost();
  }, []);

  const locations = [...new Set(jobPostings.map((job) => job.location))];
  const departments = [...new Set(jobPostings.map((job) => job.category.name))];

  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation
      ? job.location === selectedLocation
      : true;

    return matchesSearch && matchesLocation;
  });

  const benefitsList = [
    {
      title: "Cân bằng giữa công việc và cuộc sống",
      benefits: [
        "Bảo hiểm y tế, nha khoa và thị lực toàn diện",
        "Hỗ trợ và tài nguyên chăm sóc sức khỏe tinh thần",
        "Các chương trình và sáng kiến chăm sóc sức khỏe",
      ],
    },
    {
      title: "Work-Life Balance",
      benefits: [
        "Giờ làm việc linh hoạt",
        "Tùy chọn làm việc từ xa",
        "Unlimited PTO policy",
        "Paid parental leave",
      ],
    },
    {
      title: "Professional Growth",
      benefits: [
        "Continuous learning allowance",
        "Conference attendance support",
        "Training and certification programs",
        "Career development planning",
      ],
    },
    {
      title: "Financial Benefits",
      benefits: [
        "Competitive salary and bonuses",
        "401(k) matching program",
        "Stock options",
        "Profit sharing opportunities",
      ],
    },
  ];

  const JobPostingCard = ({ job }: { job: JobPosting }) => {
    const requirementsList = job.requirements
      .split("\n")
      .filter((item) => item.trim() !== "");

    const benefitsList = job.benefits
      .split("\n")
      .filter((item) => item.trim() !== "");

    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/job/${job.id}`} state={{ job }}>
                <CardTitle>{job.title}</CardTitle>
              </Link>

              <CardDescription className="mt-2">
                {job.category.name} • {job.location}{" "}
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="mb-2">
                {job.jobType}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Ngày đăng {format(parseISO(job.created_at), "dd,MM yyyy")}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{job.description}</p>
          {/* Hiển thị requirements */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Yêu cầu:</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {requirementsList.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Quyền lợi:</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {benefitsList.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          {/* Hiển thị lương nếu có */}
          {/* {(job.minSalary || job.maxSalary) && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Salary Range:</h4>
              <p className="text-sm text-muted-foreground">
                {job.minSalary ? `$${job.minSalary}` : "Negotiable"} -
                {job.maxSalary ? ` $${job.maxSalary}` : " Negotiable"}
              </p>
            </div>
          )} */}
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ứng tuyển ngay</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <Layout>
      <PageHeader
        title="Tham gia với chúng tôi ngay hôm nay"
        subtitle="Xây dựng sự nghiệp của bạn tại tuyến đầu của đổi mới công nghệ."
        backgroundImage="assets/images/joinusnow.avif"
      />

      <section className="section-container">
        {/* <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Tại sao lại chọn VIA</h2>
          <p className="text-lg">
            Tại VIA, chúng tôi tin vào việc tạo ra một môi trường nơi những
            người tài năng có thể phát huy tốt nhất khả năng của mình, phát
            triển kỹ năng và xây dựng sự nghiệp ý nghĩa, đồng thời tạo ra tác
            động tích cực cho khách hàng.
          </p>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefitsList.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border/40"
            >
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-corporate-500 mr-2 mt-0.5" />
                    <span className="text-muted-foreground text-sm">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Life at TechSphere
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Office space"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Team event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                alt="Workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div> */}

        <h2 className="text-3xl font-bold text-center mb-12">
          Đang tuyển dụng
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24 border border-border/40">
              <div className="mb-6">
                <label
                  htmlFor="search"
                  className="block text-sm font-medium mb-2"
                >
                  Tìm kiếm
                </label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Tìm kiếm vị trí tuyển dụng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Địa điểm</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className={`text-sm w-full text-left py-1 px-2 rounded-md ${
                        selectedLocation === null
                          ? "bg-corporate-500 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      Tất cả địa điểm
                    </button>
                  </div>
                  {locations.map((location) => (
                    <div key={location} className="flex items-center">
                      <button
                        onClick={() => setSelectedLocation(location)}
                        className={`text-sm w-full text-left py-1 px-2 rounded-md ${
                          selectedLocation === location
                            ? "bg-corporate-500 text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        {location}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLocation(null);
                }}
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                {departments.map((dept) => (
                  <TabsTrigger
                    key={dept}
                    value={dept.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {dept}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobPostingCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      Không tìm thấy vị trí tuyển dụng phù hợp
                    </h3>
                    <p className="text-muted-foreground">
                      Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn để tìm
                      được điều bạn đang cần.
                    </p>
                  </div>
                )}
              </TabsContent>

              {departments.map((dept) => (
                <TabsContent
                  key={dept}
                  value={dept.toLowerCase().replace(/\s+/g, "-")}
                >
                  {filteredJobs.filter((job) => job.category.name === dept)
                    .length > 0 ? (
                    filteredJobs
                      .filter((job) => job.category.name === dept)
                      .map((job) => <JobPostingCard key={job.id} job={job} />)
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-2">
                        Không tìm thấy vị trí tuyển dụng phù hợp
                      </h3>
                      <p className="text-muted-foreground">
                        Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc của bạn để tìm
                        được điều bạn đang cần.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      <section className="section-container bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Không tìm thấy công việc phù hợp?
          </h2>
          <p className="text-lg mb-8">
            Chúng tôi luôn tìm kiếm những cá nhân tài năng để gia nhập đội ngũ
            của mình. Hãy gửi cho chúng tôi CV của bạn và chúng tôi sẽ ghi nhớ
            bạn cho những cơ hội trong tương lai.
          </p>
          <Button size="lg">Gửi hồ sơ ngay</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
