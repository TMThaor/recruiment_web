import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  User,
  Phone,
  Calendar,
  Mail,
  Search,
  Paperclip,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import { JobPosting } from "./Careers";
import { useLocation, useParams } from "react-router-dom";
import { applyApiService } from "@/api/apply-api.service";
import { userApiService } from "@/api/user-api.service";
import { jwtDecode } from "jwt-decode";

interface ApplyFormData {
  job_id: string;
  status: string;
  dateOfBirth: string;
  education: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  candidate_id?: string;
}

const JobDetail = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [jobDetail, setJobDetail] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState<ApplyFormData>({
    job_id: "",
    status: "pending",
    dateOfBirth: "",
    education: "",
    email: "",
    fullname: "",
    phoneNumber: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        // Giải mã JWT để lấy accountId
        const decodedToken: { sub?: string } = jwtDecode(token);
        const id = decodedToken?.sub;
        setAccountId(id);
      } catch (error) {
        console.error("Lỗi giải mã accessToken:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (id) {
      setFormData((prev) => ({ ...prev, job_id: id }));
    }
  }, [id]);

  useEffect(() => {
    if (location.state?.job) {
      setJobDetail(location.state.job);
    } else {
      // Fetch job detail logic here
    }
  }, [location.state]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      setSubmitError("Please upload your CV");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      if (accountId) {
        const candidate = await userApiService.findCandidateById(accountId);
        await applyApiService.applyForJob(candidate.id, formData, cvFile);
      }

      await applyApiService.noCandidateApplyForJob(formData, cvFile);

      setSubmitSuccess(true);
      // Reset form after success
      setFormData({
        job_id: id || "",
        status: "pending",
        dateOfBirth: "",
        education: "",
        email: "",
        fullname: "",
        phoneNumber: "",
      });
      setCvFile(null);

      setTimeout(() => {
        setShowApplyModal(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Application failed:", error);
      setSubmitError("Application failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!jobDetail) {
    return <div>Loading...</div>;
  }

  // Format date for display
  const formattedDate = new Date(jobDetail.created_at).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
  function formatCurrencyVND(value: number | null | undefined): string {
    if (!value || value <= 0) return "Thỏa thuận";
    return value.toLocaleString("vi-VN") + " đ";
  }

  return (
    <Layout>
      <div>
        <PageHeader
          title={""}
          subtitle={""}
          backgroundImage={"/assets/images/jobdetail.avif"}
        />

        {/* Main Job Content */}
        <section className="section-container -mt-24 max-w-7xl mx-auto py-10 flex flex-col md:flex-row gap-8">
          {/* Left Column - Job Details */}
          <div className="flex-1">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-corporate-700">
                  {jobDetail.title}
                </h1>
              </div>
            </div>

            <div className="p-8">
              {/* Job Description */}
              <h2 className="text-2xl font-bold text-corporate-700 mb-6">
                MÔ TẢ CÔNG VIỆC
              </h2>
              <div className="mb-8 space-y-3">
                {jobDetail.description.split("\n").map((desc, idx) => (
                  <p key={idx} className="text-gray-800">
                    {desc}
                  </p>
                ))}
              </div>

              {/* Requirements */}
              <h2 className="text-2xl font-bold text-corporate-700 mb-6">
                YÊU CẦU
              </h2>
              <ul className="mb-8 space-y-3">
                {jobDetail.requirements
                  .split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-800"
                    >
                      <span className="text-corporate-500 mt-1">▶</span>
                      <span>{req}</span>
                    </li>
                  ))}
              </ul>

              {/* Benefits */}
              <h2 className="text-2xl font-bold text-corporate-700 mb-6">
                QUYỀN LỢI
              </h2>
              <ul className="mb-8 space-y-3">
                {jobDetail.benefits
                  .split("\n")
                  .filter((item) => item.trim() !== "")
                  .map((ben, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-800"
                    >
                      <span className="text-corporate-500 mt-1">▶</span>
                      <span>{ben}</span>
                    </li>
                  ))}
              </ul>

              {/* Apply Button */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <Button
                  className="flex-1 text-base py-4 font-semibold bg-corporate-500 hover:bg-corporate-600 text-white rounded-lg shadow"
                  onClick={() => setShowApplyModal(true)}
                >
                  ỨNG TUYỂN NGAY
                </Button>
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                Ngày hết hạn:{" "}
                <span className="font-medium">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Job Summary */}
          <aside className="w-full md:w-[400px] flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 sticky top-24 border border-border/40">
              <div className="flex gap-2 mb-4">
                <Button
                  className="flex-1 font-semibold bg-corporate-500 hover:bg-corporate-600 text-white"
                  onClick={() => setShowApplyModal(true)}
                >
                  ỨNG TUYỂN NGAY
                </Button>
              </div>

              <h3 className="text-base font-bold text-corporate-700 mb-4 uppercase tracking-wide">
                CHI TIẾT CÔNG VIỆC
              </h3>

              <div className="space-y-2 text-[15px]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Số lượng:</span>{" "}
                  {jobDetail.quantity}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Địa điểm:</span>{" "}
                  {jobDetail.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Kinh nghiệm:</span>{" "}
                  {jobDetail.experienceRequired > 0
                    ? jobDetail.experienceRequired + " năm"
                    : "Không cần"}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Trình độ:</span>{" "}
                  {jobDetail.level}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Hình thức:</span>{" "}
                  {jobDetail.jobType}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Kỹ năng:</span>{" "}
                  {jobDetail.skills}
                </div>

                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-corporate-500" />
                  <span className="font-medium">Mức lương:</span>

                  {jobDetail.minSalary > 0 && jobDetail.maxSalary > 0 ? (
                    <>
                      {formatCurrencyVND(jobDetail.minSalary)} -{" "}
                      {formatCurrencyVND(jobDetail.maxSalary)}
                    </>
                  ) : jobDetail.minSalary > 0 ? (
                    <>{formatCurrencyVND(jobDetail.minSalary)}</>
                  ) : jobDetail.maxSalary > 0 ? (
                    <>{formatCurrencyVND(jobDetail.maxSalary)}</>
                  ) : (
                    <>Thỏa thuận</>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-10 relative animate-fadeIn">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold"
            >
              ×
            </button>

            {submitSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Ứng tuyển thành công
                </h3>
                <p className="text-gray-600">
                  Cảm ơn bạn đã ứng tuyển tại VIA. Chúng tôi sẽ xem xét và gửi
                  phản hồi sớm
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Bạn đang ứng tuyển vị trí{" "}
                  <span className="text-corporate-500">{jobDetail.title}</span>
                </h2>

                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-base font-medium mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500"
                        placeholder="Vui lòng nhập họ tên đầy đủ của bạn"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-base font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500"
                        placeholder="Vui lòng nhập email của bạn"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-base font-medium mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500"
                        placeholder="Vui lòng nhập số điện thoại của bạn"
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-base font-medium mb-2">
                      Năm sinh <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="md:col-span-2">
                    <label className="block text-base font-medium mb-2">
                      Học vấn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500 appearance-none"
                        required
                      >
                        <option value="">
                          Vui lòng chọn trường đại học của bạn
                        </option>
                        <option value="Đại học Bách Khoa Hà Nội">
                          Đại học Bách Khoa Hà Nội
                        </option>
                        <option value="Trường đại học FPT">
                          Trường đại học FPT{" "}
                        </option>
                        <option value="Học viện Bưu chính viễn thông">
                          Học viện Bưu chính viễn thông
                        </option>
                        <option value="Trường đại học Thủy Lợi">
                          Trường đại học Thủy Lợi
                        </option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-base font-medium mb-2">
                      Đính kèm CV <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-corporate-500" />
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-3 text-base focus:outline-none focus:ring-2 focus:ring-corporate-500"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        required
                      />
                    </div>
                    {cvFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        Vui lòng đính kèm CV: {cvFile.name}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 mt-6 flex justify-center">
                    <Button
                      type="submit"
                      className="w-full md:w-1/2 bg-corporate-500 hover:bg-corporate-600 text-white text-lg font-semibold py-3 rounded-xl shadow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang gửi..." : "Ứng tuyển"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JobDetail;
