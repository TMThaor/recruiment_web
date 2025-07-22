import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

type PostStatus = "Published" | "Draft" | "Scheduled";

// type SupabasePost = {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   featured_image: string;
//   category: string;
//   author: string;
//   status: string;
//   publish_date: string | null;
//   tags: string | null;
//   created_at: string | null;
//   updated_at: string | null;
// }

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: PostStatus;
  publish_date?: Date | null;
  author: string;
  category: string;
  tags?: string | null;
  featured_image: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

const fetchPost = async (postId: string) => {
  const response = await fetch(`/api/blog-posts/${postId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const responseData = await response.json();

  if (!responseData || !responseData.data) {
    throw new Error("Invalid response format");
  }

  return {
    ...responseData.data,
    status: responseData.data.status as PostStatus,
  };
};

const updatePost = async ({ id, data }: { id: string; data: PostValues }) => {
  try {
    const response = await fetch(`/api/blog-posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(
        `Failed to update post: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();

    if (!responseData || !responseData.data) {
      throw new Error("Invalid response format from server");
    }

    return responseData.data;
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
};

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
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

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featured_image: post.featured_image,
        category: post.category,
        author: post.author,
        status: post.status as "Published" | "Draft" | "Scheduled",
        publish_date: post.publish_date
          ? new Date(post.publish_date).toISOString().split("T")[0]
          : undefined,
        tags: post.tags || "",
      });
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });

      toast.success("Post updated successfully!");
      navigate("/admin/posts");
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
      setIsSaving(false);
    },
  });

  const onSubmit = async (values: PostValues) => {
    setIsSaving(true);
    const formattedData = {
      ...values,
      publish_date: values.publish_date
        ? new Date(values.publish_date).toISOString()
        : null,
    };
    mutation.mutate({ id, data: formattedData });
  };

  if (isLoading) {
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
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6 space-y-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6 space-y-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
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
            <h1 className="text-3xl font-bold">Post Not Found</h1>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6">
            <p>
              There was an error loading the post. Please try again or go back
              to posts.
            </p>
            <Button onClick={() => navigate("/admin/posts")} className="mt-4">
              Return to posts
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

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
          <h1 className="text-3xl font-bold">Edit Post</h1>
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
                      {isSaving ? "Saving..." : "Update Post"}
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
                          value={field.value}
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
                          value={field.value}
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
                          value={field.value}
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

export default EditPost;
