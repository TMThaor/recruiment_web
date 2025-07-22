import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { candidateApiService } from "@/api/candidate-api.service";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { IJobPost } from "@/interfaces/api-models/job-post.types";
import { IAppliedJob } from "@/interfaces/api-models/candidate.type";
import { userApiService } from "@/api/user-api.service";

export default function AppliedHistoryPage() {
  const [filter, setFilter] = useState("all");
  const [appliedJobs, setAppliedJobs] = useState<IAppliedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setIsLoading(true);
        if (userId) {
          const candidate = await userApiService.findCandidateById(userId);
          const jobs = await candidateApiService.getAppliedJobs(candidate.id);
          setAppliedJobs(jobs);
        }
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
        toast.error("Failed to load application history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [userId]);

  const filteredJobs = appliedJobs.filter((apply) => {
    if (filter === "all") return true;
    return apply.status.toLowerCase() === filter;
  });

  const handleViewCV = (jobId: string) => {
    // Logic để xem CV đã ứng tuyển
    console.log("View CV for job:", jobId);
  };

  const handleEditApplication = (jobId: string) => {
    // Logic để chỉnh sửa đơn ứng tuyển
    console.log("Edit application for job:", jobId);
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="rounded-xl border shadow-md bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Lịch sử ứng tuyển</h1>
            <Select
              defaultValue="all"
              onValueChange={(value) => setFilter(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <hr className="mb-10" />
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((appliedJob) => (
                <div
                  key={appliedJob.id}
                  className="border-b pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold">
                        {appliedJob.job.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Danh mục: {appliedJob.job.category.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Địa điểm: {appliedJob.job.location} | Type:{" "}
                        {appliedJob.job.jobType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Kinh nghiệm:{" "}
                        {appliedJob.job.experienceRequired > 0
                          ? appliedJob.job.experienceRequired + " năm"
                          : "Không cần"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ngày ứng tuyển:{" "}
                        <span className="text-muted-foreground">
                          {new Date(appliedJob.created_at).toLocaleDateString()}
                        </span>
                      </p>
                      {appliedJob.status === "Viewed" && (
                        <p className="text-sm mt-1 text-red-500 font-medium">
                          Employer has viewed your profile
                        </p>
                      )}
                      {appliedJob.status === "Shortlisted" && (
                        <p className="text-sm mt-1 text-green-600 font-medium">
                          Your application has been shortlisted!
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <Badge
                        variant="outline"
                        className={
                          appliedJob.status === "Viewed"
                            ? "text-red-600 border-red-600"
                            : appliedJob.status === "Shortlisted"
                            ? "text-green-600 border-green-600"
                            : appliedJob.status === "Rejected"
                            ? "text-gray-600 border-gray-600"
                            : "text-blue-600 border-blue-600"
                        }
                      >
                        {appliedJob.status}
                      </Badge>
                      <div className="flex flex-col gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEditApplication(appliedJob.job_id)
                          }
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCV(appliedJob.job_id)}
                        >
                          Xem CV
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No applied jobs found.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
