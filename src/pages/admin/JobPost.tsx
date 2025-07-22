import { useEffect, useState } from "react";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pen, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IJobPost } from "@/interfaces/api-models/job-post.types";
import { jobPostApiService } from "@/api/job-post-api.service";
import { Link } from "react-router-dom";
import { categoryApiService } from "@/api/category-api.service";
import { ICategory } from "@/interfaces/api-models/category.type";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  category_id: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.string().min(10),
  benefits: z.string().min(10),
  quantity: z.number().min(1),
  location: z.string().min(2),
  experienceRequired: z.number(),
  jobType: z.string().min(1),
  skills: z.string().min(1),
  level: z.string().min(4),
  maxSalary: z.number().min(0),
  minSalary: z.number().min(0),
  expire_at: z.string().optional().nullable(),
});

const JobPosts = () => {
  const [jobPosts, setJobPosts] = useState<IJobPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<IJobPost | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [deleteJob, setDeleteJob] = useState<IJobPost | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category_id: "",
      description: "",
      requirements: "",
      benefits: "",
      quantity: 1,
      location: "",
      experienceRequired: 0,
      jobType: "",
      skills: "",
      level: "",
      maxSalary: 0,
      minSalary: 0,
      expire_at: "",
    },
  });

  const getJobPosts = async () => {
    try {
      const res = await jobPostApiService.getAllJobPosts();
      if (res) setJobPosts(res);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    try {
      const res = await categoryApiService.getAllCategory();
      setCategories(res);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    getJobPosts();
    getCategories();
  }, []);

  const addNewJobPost = async (newJobPost: IJobPost) => {
    try {
      const res = await jobPostApiService.createJobPost(newJobPost);
      setJobPosts([...jobPosts, res]);
      toast.success("Thêm tin mới thành công");
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Thêm tin mới thất bại");
      return false;
    }
  };

  const onSubmit = async (values: IJobPost) => {
    try {
      if (editingJob) {
        const updatedJob = await jobPostApiService.updateJobPost(
          editingJob.id,
          values
        );
        setJobPosts(
          jobPosts.map((job) => (job.id === editingJob.id ? updatedJob : job))
        );
        toast.success("Cập nhật thông tin thành công");
      } else {
        await addNewJobPost(values);
      }
      setIsOpen(false);
      form.reset();
      setEditingJob(null);
    } catch (error) {
      console.error("Có lỗi xảy ra. Vui lòng thử lại:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  // const handleEdit = (job: IJobPost) => {
  //   setEditingJob(job);
  //   form.reset(job);
  //   setIsOpen(true);
  // };

  const handleEdit = (job: IJobPost) => {
    setEditingJob(job);
    form.reset({
      ...job,
      expire_at: job.expire_at
        ? format(new Date(job.expire_at), "yyyy-MM-dd")
        : "",
    });
    setIsOpen(true);
  };
  const handleAddNew = () => {
    setEditingJob(null);
    form.reset({
      title: "",
      category_id: "",
      description: "",
      requirements: "",
      benefits: "",
      quantity: 1,
      location: "",
      experienceRequired: 0,
      jobType: "",
      skills: "",
      level: "",
      maxSalary: 0,
      minSalary: 0,
    });
    setIsOpen(true);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tin tuyển dụng</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Thêm tin mới
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vị trí tuyển dụng</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Địa điểm làm việc</TableHead>
                  <TableHead>Hình thức</TableHead>
                  <TableHead>Yêu cầu kinh nghiệm</TableHead>
                  <TableHead>Ngày đăng</TableHead>
                  <TableHead className="w-[120px]">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobPosts.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/admin/jobs/${job.id}/applications`}
                        state={job}
                        className="hover:underline"
                      >
                        {job.title}
                      </Link>
                    </TableCell>
                    <TableCell>{job.category?.name || "Unknown"}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.jobType}</TableCell>
                    <TableCell className="">
                      {job.experienceRequired > 0
                        ? job.experienceRequired + " năm"
                        : "Không cần"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(job.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(job)}
                        >
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteJob(job)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>
              {editingJob
                ? "Chỉnh sửa tin tuyển dụng"
                : "Thêm mới tin tuyển dụng"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vị trí tuyển dụng</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả công việc</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yêu cầu</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền lợi</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa điểm</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="experienceRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kinh nghiệm</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hình thức</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kỹ năng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trình độ</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expire_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hạn ứng tuyển (tuỳ chọn)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === "" ? null : e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mức lương tối thiểu</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mức lương tối đa</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {editingJob ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteJob}
        onOpenChange={(open) => !open && setDeleteJob(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa tin tuyển dụng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa{" "}
              <span className="font-semibold">{deleteJob?.title}</span>? Hành
              động này không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteJob(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleteJob) return;
                try {
                  await jobPostApiService.deleteJobPost(deleteJob.id);
                  setJobPosts((prev) =>
                    prev.filter((job) => job.id !== deleteJob.id)
                  );
                  toast.success("Xóa tin tuyển dụng thành công");
                } catch (err) {
                  toast.error("Xóa tin tuyển dụng thất bại");
                  console.error(err);
                } finally {
                  setDeleteJob(null);
                }
              }}
            >
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default JobPosts;
