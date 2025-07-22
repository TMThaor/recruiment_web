import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Blockchain",
  "AI & Machine Learning",
  "E-Commerce",
  "CMS",
  "IoT",
  "Digital Transformation",
  "Cybersecurity",
  "Data Analytics",
];

const authors = [
  "Michael Thompson",
  "Sarah Chen",
  "David Rodriguez",
  "Emily Nguyen",
  "Robert Kim",
  "Priya Patel",
  "Thomas Weber",
  "Lisa Johnson",
];

const postSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  excerpt: z
    .string()
    .min(20, { message: "Excerpt must be at least 20 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  featured_image: z
    .string()
    .min(1, { message: "Featured image URL is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  status: z.enum(["Published", "Draft", "Scheduled"]),
  publish_date: z.string().optional(),
  tags: z.string().optional(),
});

type PostValues = z.infer<typeof postSchema>;

const createPost = async (postData: PostValues) => {
  const response = await fetch("/api/blog-posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create post");
  }

  const data = await response.json();
  return data;
};

const NewPost = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      featured_image: "",
      category: "",
      author: "",
      status: "Draft",
      publish_date: new Date().toISOString().split("T")[0],
      tags: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post saved successfully!");
      navigate("/admin/posts");
    },
    onError: (error) => {
      console.error("Error saving post:", error);
      toast.error("Failed to save post. Please try again.");
      setIsSaving(false);
    },
  });

  const onSubmit = async (values: PostValues) => {
    setIsSaving(true);
    const dataToSend = {
      ...values,
      publish_date: values.publish_date
        ? new Date(values.publish_date).toISOString()
        : undefined,
    };
    mutation.mutate(dataToSend);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/posts")}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
          <h1 className="text-3xl font-bold">Create New Post</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter post title"
                            className="text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a brief excerpt..."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your post content here..."
                            className="min-h-[300px]"
                            {...field}
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
                      onClick={() => navigate("/admin/posts")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Post"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6 space-y-6">
              <h3 className="text-lg font-medium">Post Settings</h3>

              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publish_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publish Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select author" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author} value={author}>
                                {author}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tags, separated by commas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        {field.value && (
                          <div className="mt-2 border rounded overflow-hidden">
                            <img
                              src={field.value}
                              alt="Featured image preview"
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewPost;
