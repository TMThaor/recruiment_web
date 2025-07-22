import { useState, useEffect } from "react";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Pen, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { staffApiService } from "@/api/staff-api.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  id: string;
  fullName: string;
  position: string;
  email: string;
  status: string;
}

const formSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  position: z.string().min(2, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  status: z.string().min(1, { message: "Status is required" }),
});

const statusOptions = [
  { value: "active", label: "Đang hoạt động" },
  { value: "inactive", label: "Nghỉ phép dài" },
  { value: "on_leave", label: "Đã nghỉ việc" },
];

const Staff = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteMember, setDeleteMember] = useState<TeamMember | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      position: "",
      email: "",
      status: "active",
    },
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        const response = await staffApiService.getAllStaff();
        setMembers(response);
      } catch (error) {
        toast.error("Failed to fetch staff members");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      if (editingMember) {
        // Update existing member
        const updatedMember = await staffApiService.updateStaff(
          editingMember.id,
          {
            fullName: values.fullName,
            position: values.position,
            email: values.email,
            status: values.status,
          }
        );

        setMembers(
          members.map((m) => (m.id === editingMember.id ? updatedMember : m))
        );
        toast.success("Staff member updated successfully");
      } else {
        // Add new member
        const newMember = await staffApiService.createStaff({
          fullName: values.fullName,
          position: values.position,
          email: values.email,
          status: values.status,
        });

        setMembers([...members, newMember]);
        toast.success("Staff member added successfully");
      }

      setIsOpen(false);
      form.reset();
      setEditingMember(null);
    } catch (error) {
      toast.error("Failed to save staff member");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    form.reset({
      id: member.id,
      fullName: member.fullName,
      position: member.position,
      email: member.email,
      status: member.status,
    });
    setIsOpen(true);
  };

  const handleDelete = (member: TeamMember) => {
    setDeleteMember(member);
  };

  const handleAddNew = () => {
    setEditingMember(null);
    form.reset({
      fullName: "",
      position: "",
      email: "",
      status: "active",
    });
    setIsOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "on_leave":
        return "outline";
      default:
        return "default";
    }
  };
  const getStatusVI = (status: string) => {
    switch (status) {
      case "active":
        return "Đang hoạt động";
      case "inactive":
        return "Nghỉ phép dài";
      case "on_leave":
        return "Đã nghỉ việc";
      default:
        return "default";
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Danh sách nhân viên</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên mới
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
          {isLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ và Tên</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.fullName}
                      </TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(member.status)}>
                          {getStatusVI(
                            member.status.replace("_", " ").toLowerCase()
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(member)}
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member)}
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
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingMember
                ? "Chỉnh sửa thông tin nhân viên"
                : "Thêm nhân viên mới"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Văn A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vị trí</FormLabel>
                      <FormControl>
                        <Input placeholder="CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="youremail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingMember ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!deleteMember}
        onOpenChange={(open) => !open && setDeleteMember(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa nhân viên</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa nhân viên{" "}
              <span className="font-semibold">{deleteMember?.fullName}</span>?
              Hành động này không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteMember(null)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleteMember) return;
                try {
                  await staffApiService.deleteStaff(deleteMember.id);
                  setMembers((prev) =>
                    prev.filter((m) => m.id !== deleteMember.id)
                  );
                  toast.success("Staff member deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete staff member");
                  console.error(err);
                } finally {
                  setDeleteMember(null);
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

export default Staff;
