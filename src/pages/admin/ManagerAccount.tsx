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
import { userApiService } from "@/api/user-api.service";
import { Badge } from "@/components/ui/badge";

interface AdminAccount {
  id: string;
  username: string;
  role: string;
  admin: {
    id: string;
    account_id: string;
    fullname: string;
    email: string | null;
  };
}

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
});

const AdminAccountPage = () => {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AdminAccount | null>(
    null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      email: "",
    },
  });

  useEffect(() => {
    const fetchAdminAccounts = async () => {
      try {
        setIsLoading(true);
        const response = await userApiService.getAllAdminAccount();
        setAccounts(response);
      } catch (error) {
        toast.error("Failed to fetch admin accounts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminAccounts();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      if (editingAccount) {
        // Update existing account (if you have an update API)
        // const updatedAccount = await userApiService.updateAdminAccount(editingAccount.id, {
        //   username: values.username,
        //   fullname: values.fullname,
        //   email: values.email || null,
        // });
        // setAccounts(accounts.map(a => a.id === editingAccount.id ? updatedAccount : a));
        // toast.success("Admin account updated successfully");
        toast.warning("Update functionality not implemented yet");
      } else {
        // Add new account
        const newAccount = await userApiService.createAdminAccount({
          username: values.username,
          password: values.password,
          fullname: values.fullname,
          email: values.email || null,
        });

        setAccounts([...accounts, newAccount]);
        toast.success("Admin account created successfully");
      }

      setIsOpen(false);
      form.reset();
      setEditingAccount(null);
    } catch (error) {
      toast.error("Failed to save admin account");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (account: AdminAccount) => {
    setEditingAccount(account);
    form.reset({
      username: account.username,
      password: "", // Don't pre-fill password for security
      fullname: account.admin.fullname,
      email: account.admin.email || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this admin account?")) {
      try {
        // await userApiService.deleteAdminAccount(id);
        // setAccounts(accounts.filter(account => account.id !== id));
        // toast.success("Admin account deleted successfully");
        toast.warning("Delete functionality not implemented yet");
      } catch (error) {
        toast.error("Failed to delete admin account");
        console.error(error);
      }
    }
  };

  const handleAddNew = () => {
    setEditingAccount(null);
    form.reset({
      username: "",
      password: "",
      fullname: "",
      email: "",
    });
    setIsOpen(true);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "superadmin":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tài khoản quản trị</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
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
                    <TableHead>Tên tài khoản</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quyền</TableHead>
                    <TableHead className="w-[100px]">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        {account.username}
                      </TableCell>
                      <TableCell>{account.admin.fullname}</TableCell>
                      <TableCell>{account.admin.email || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(account.role)}>
                          {account.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(account)}
                          >
                            <Pen className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(account.id)}
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
              {editingAccount
                ? "Chỉnh sửa thông tin tài khoản"
                : "Thêm tài khoản mới"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tài khoản *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin123"
                          {...field}
                          disabled={!!editingAccount}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!editingAccount && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
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
                  {editingAccount ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminAccountPage;
