import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/interfaces/api-models/category.type";
import { categoryApiService } from "@/api/category-api.service";
import { format } from "date-fns";
import { toast } from "sonner";
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

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [deleteCategory, setDeleteCategory] = useState<ICategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const res = await categoryApiService.getAllCategory();
      if (res) {
        setCategories(res);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const filteredCategories = categories.filter((category: ICategory) => {
    return category.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const onSubmit = async (values: ICategory) => {
    try {
      if (editingCategory) {
        const updatedCategory = await categoryApiService.updateCategory(
          editingCategory.id,
          values
        );
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id ? updatedCategory : cat
          )
        );
        toast.success("Category updated successfully");
      } else {
        const newCategory = await categoryApiService.createCategory(values);
        setCategories([...categories, newCategory]);
        toast.success("Category added successfully");
      }
      setIsOpen(false);
      form.reset();
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category");
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    form.reset({ name: "" });
    setIsOpen(true);
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    form.reset({ name: category.name });
    setIsOpen(true);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Các danh mục</h1>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Thêm danh mục mới
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="w-full sm:w-1/2">
                <Input
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="w-[120px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      {format(new Date(category.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                        >
                          <Pen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteCategory(category)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Không tìm thấy danh mục nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input placeholder="Điền tên danh mục" {...field} />
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
                <Button type="submit">
                  {editingCategory ? "Chỉnh sửa" : "Thêm mới"} danh mục
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteCategory}
        onOpenChange={(open) => !open && setDeleteCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc muốn xóa{" "}
              <span className="font-semibold">{deleteCategory?.name}</span>?
              Hành động này không thể hoàn tác
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteCategory(null)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleteCategory) return;
                try {
                  await categoryApiService.deleteCategory(deleteCategory.id);
                  setCategories((prev) =>
                    prev.filter((cat) => cat.id !== deleteCategory.id)
                  );
                  toast.success("Category deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete category");
                  console.error(err);
                } finally {
                  setDeleteCategory(null);
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

export default Categories;
