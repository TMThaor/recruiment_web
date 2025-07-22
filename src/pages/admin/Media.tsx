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
import { Plus, Trash2, Image, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { mediaApiService } from "@/api/media-api.service";

interface MediaItem {
  id: string;
  name: string;
  path: string;
  type: string;
  created_at: string;
}

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    ),
  name: z.string().min(1, { message: "Name is required" }),
});

const Media = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });

  // Fetch media items
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        const response = await mediaApiService.getAll();
        setMedia(response);
      } catch (error) {
        toast.error("Failed to fetch media");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("name", values.name);

      const response = await mediaApiService.uploadFile(formData);
      setMedia([response, ...media]);
      toast.success("Media uploaded successfully");
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to upload media");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa file?")) {
      try {
        await mediaApiService.deleteById(id);
        setMedia(media.filter((item) => item.id !== id));
        toast.success("Media deleted successfully");
      } catch (error) {
        toast.error("Failed to delete media");
        console.error(error);
      }
    }
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getFileType = (path: string) => {
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".avif",
    ];
    const extension = path.substring(path.lastIndexOf(".")).toLowerCase();
    return imageExtensions.includes(extension) ? "image" : "document";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Thư viện đa phương tiện</h1>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Thêm mới
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search media..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("grid")}
                className="w-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("list")}
                className="w-12"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No media found</h3>
              <p className="text-muted-foreground">
                {filter
                  ? "Try a different search term"
                  : "Upload media to get started"}
              </p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 group relative"
                >
                  {getFileType(item.path) === "image" ? (
                    <div className="aspect-square">
                      <img
                        src={item.path}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  <div className="p-3">
                    <h3 className="font-medium truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{getFileType(item.path)}</span>
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-left">
                  <tr className="border-b">
                    <th className="py-2 px-4 font-medium">Name</th>
                    <th className="py-2 px-4 font-medium">Type</th>
                    <th className="py-2 px-4 font-medium">Date</th>
                    <th className="py-2 px-4 font-medium sr-only">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getFileType(item.path) === "image" ? (
                            <div className="w-10 h-10 mr-3 rounded overflow-hidden">
                              <img
                                src={item.path}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 mr-3 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize">
                        {getFileType(item.path)}
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(item.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Media Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Media name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Media File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {value && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Selected file: {value.name}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Media;
