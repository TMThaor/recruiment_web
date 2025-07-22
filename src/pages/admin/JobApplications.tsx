import { useEffect, useState } from "react";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applicationApiService } from "@/api/application-api.service";
import { IApplication } from "@/api/application-api.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  MoreVertical,
  Calendar,
  Mail,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import { jobPostApiService } from "@/api/job-post-api.service";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Pending" },
  { value: "interview", label: "Interview" },
  { value: "offerd", label: "Offered" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

const JobApplications = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [job, setJob] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    IApplication[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<IApplication | null>(null);

  // Form states
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [isChangeOfferDialogOpen, setIsChangeOfferDialogOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      if (id) {
        const data = await jobPostApiService.getCandidatesByJobId(id);
        setApplications(data.applications);
        setFilteredApplications(data.applications);
        setJob(data.title);
      }
    } catch (error) {
      toast.error("Failed to fetch applications");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [id]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((app) => app.status === statusFilter)
      );
    }
  }, [statusFilter, applications]);

  const handleStatusChange = async (
    applicationId: string,
    newStatus: string
  ) => {
    try {
      await applicationApiService.updateApplicationStatus(
        applicationId,
        newStatus
      );
      toast.success("Application status updated");
      fetchApplications();
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this application?")) {
      try {
        await applicationApiService.deleteApplication(id);
        toast.success("Application deleted");
        fetchApplications();
      } catch (error) {
        toast.error("Failed to delete application");
        console.error(error);
      }
    }
  };

  const handleScheduleInterview = async () => {
    if (!selectedApplication) return;
    try {
      await applicationApiService.scheduleInterview(selectedApplication.id, {
        date: interviewDate,
        time: interviewTime,
        type: interviewType,
        location: interviewLocation,
        interviewer,
      });

      toast.success("Interview scheduled successfully");
      setIsInterviewDialogOpen(false);
      resetInterviewForm();
    } catch (error) {
      toast.error("Failed to schedule interview");
      console.error(error);
    }
  };

  const handleSendOffer = async () => {
    if (!selectedApplication) return;
    try {
      await applicationApiService.sendOffer(selectedApplication.id, {
        salary,
        startDate,
        workLocation,
      });

      toast.success("Offer sent successfully");
      setIsOfferDialogOpen(false);
      resetOfferForm();
    } catch (error) {
      toast.error("Failed to send offer");
      console.error(error);
    }
  };

  const handleChangeOffer = async () => {
    if (!selectedApplication) return;
    try {
      // Gửi offer mới tới backend
      // await applicationApiService.changeOffer(selectedApplication.id, {
      //   salary,
      //   startDate,
      //   workLocation,
      // });

      toast.success("Offer updated successfully");
      setIsChangeOfferDialogOpen(false);
      resetOfferForm();
    } catch (error) {
      toast.error("Failed to update offer");
      console.error(error);
    }
  };
  const handleHire = async () => {
    if (!selectedApplication) return;
    try {
      await applicationApiService.hireApplication(selectedApplication.id);
      toast.success("Candidate hired successfully");
      setIsHireDialogOpen(false);
    } catch (error) {
      toast.error("Failed to hire candidate");
      console.error(error);
    }
  };

  const handleReject = async () => {
    if (!selectedApplication) return;
    try {
      await applicationApiService.rejectApplication(selectedApplication.id);

      toast.success("Application rejected");
      setIsRejectDialogOpen(false);
      setRejectReason("");
    } catch (error) {
      toast.error("Failed to reject application");
      console.error(error);
    }
  };

  const resetInterviewForm = () => {
    setInterviewDate("");
    setInterviewTime("");
    setInterviewType("");
    setInterviewLocation("");
    setInterviewer("");
  };

  const resetOfferForm = () => {
    setSalary("");
    setStartDate("");
    setWorkLocation("");
  };

  const openActionMenu = (application: IApplication, action: string) => {
    setSelectedApplication(application);
    switch (action) {
      case "schedule":
        setIsInterviewDialogOpen(true);
        break;
      case "offered":
        setIsOfferDialogOpen(true);
        break;
      case "hired":
        setIsHireDialogOpen(true);
        break;
      case "rejected":
        setIsRejectDialogOpen(true);
        break;
      case "reschedule":
        setIsInterviewDialogOpen(true);
        break;
      case "change-offer":
        setIsChangeOfferDialogOpen(true);
        break;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Danh sách các ứng viên</h1>
            <p className="text-muted-foreground">
              Bạn đang xem danh sách ứng viên ứng tuyển vị trí: {job}
            </p>
          </div>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="w-64">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline" className="px-4 py-1.5">
            {filteredApplications.length} ứng viên
          </Badge>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ứng viên</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Học vấn</TableHead>
                    <TableHead>Ngày sinh</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.fullname}
                        <p className="text-sm text-muted-foreground">
                          {application.email}
                        </p>
                      </TableCell>
                      <TableCell>{application.phoneNumber}</TableCell>
                      <TableCell className="capitalize">
                        {application.education}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(application.dateOfBirth),
                          "dd/MM/yyyy"
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`${baseUrl}${application.cv}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Tải CV
                        </a>
                      </TableCell>
                      <TableCell>{application.status}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {application.status.toLowerCase() === "pending" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  openActionMenu(application, "schedule")
                                }
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                Hẹn phỏng vấn
                              </DropdownMenuItem>
                            )}
                            {application.status.toLowerCase() ===
                              "interview" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openActionMenu(application, "offered")
                                  }
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  Gửi thư mời nhận việc
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openActionMenu(application, "reschedule")
                                  }
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Hẹn lại lịch phỏng vấn
                                </DropdownMenuItem>
                              </>
                            )}
                            {application.status.toLowerCase() === "offered" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openActionMenu(application, "hired")
                                  }
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Tuyển ứng viên
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openActionMenu(application, "change-offer")
                                  }
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Thay đổi mức đề nghị
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() =>
                                openActionMenu(application, "rejected")
                              }
                            >
                              <X className="mr-2 h-4 w-4" />
                              Từ chối
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Interview Dialog */}
      <Dialog
        open={isInterviewDialogOpen}
        onOpenChange={setIsInterviewDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lịch hẹn phỏng vấn</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ngày</Label>
                <Input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Giờ</Label>
                <Input
                  type="time"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Hình thức phỏng vấn</Label>
              <Select onValueChange={setInterviewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Trực tiếp">Trực tiếp</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Địa chỉ/Chi tiết</Label>
              <Input
                value={interviewLocation}
                onChange={(e) => setInterviewLocation(e.target.value)}
                placeholder="Điền địa điểm phỏng vấn hoặc link meeting"
              />
            </div>
            <div>
              <Label>Người phỏng vấn</Label>
              <Input
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                placeholder="Người phỏng vấn"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleScheduleInterview}>Hẹn lịch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi thư mời nhận việc</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Mức lương</Label>
              <Input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Nhập mức lương"
              />
            </div>
            <div>
              <Label>Thời gian bắt đầu làm việc dự kiến</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Địa chỉ làm việc</Label>
              <Input
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                placeholder="Nhập địa chỉ làm việc"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSendOffer}>Gửi đề nghị</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isChangeOfferDialogOpen}
        onOpenChange={setIsChangeOfferDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thay đổi đề nghị</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Mức Lương</Label>
              <Input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Nhập mức lương"
              />
            </div>
            <div>
              <Label>Thời gian bắt đầu làm việc dự kiến</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Địa chỉ làm việc</Label>
              <Input
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                placeholder="Nhập địa chỉ làm việc"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleChangeOffer}>Gửi lại đề nghị</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hire Confirmation Dialog */}
      <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận tuyển</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Bạn chắc chắn muốn tuyển ứng viên {selectedApplication?.fullname}?
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleHire}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối ứng viên</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Lý do từ chối</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Từ chối ứng viên
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default JobApplications;
