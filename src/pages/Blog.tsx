import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: "ai-tai-viet-nam",
      title: "Trí tuệ nhân tạo tại Việt Nam: Thực trạng và tiềm năng",
      excerpt:
        "Khám phá cách trí tuệ nhân tạo đang được ứng dụng tại Việt Nam trong các lĩnh vực như y tế, giáo dục, nông nghiệp và sản xuất.",
      author: {
        name: "Nguyễn Minh Huy",
        avatar: "assets/images/vialogo.png",
        role: "Chuyên gia AI tại FPT Software",
      },
      date: "15/6/2025",
      readTime: "10 phút đọc",
      image: "assets/images/blog1.jpg",
      category: "AI & Machine Learning",
      tags: ["Trí tuệ nhân tạo", "Chuyển đổi số", "Việt Nam"],
    },
    {
      id: "an-toan-thong-tin",
      title: "An toàn thông tin trong doanh nghiệp vừa và nhỏ",
      excerpt:
        "Tổng quan về các mối đe dọa an ninh mạng và cách doanh nghiệp vừa và nhỏ tại Việt Nam có thể phòng tránh rủi ro.",
      author: {
        name: "Lê Thu Trang",
        avatar: "assets/images/vialogo.png",
        role: "Chuyên viên An ninh mạng tại VNPT",
      },
      date: "05/07/2025",
      readTime: "8 phút đọc",
      image: "assets/images/blog2.png",
      category: "Cybersecurity",
      tags: ["Bảo mật", "Doanh nghiệp", "An toàn thông tin"],
    },
    {
      id: "cloud-viet-nam",
      title: "Chuyển dịch lên Cloud – Cơ hội hay thách thức?",
      excerpt:
        "Việc chuyển hệ thống lên đám mây đang là xu hướng tại Việt Nam. Bài viết phân tích lợi ích, rào cản và cách tiếp cận hiệu quả.",
      author: {
        name: "Phạm Hoàng Dũng",
        avatar: "assets/images/vialogo.png",
        role: "Cloud Architect tại CMC",
      },
      date: "22/05/2025",
      readTime: "9 phút đọc",
      image: "assets/images/blog3.jpg",
      category: "Cloud Computing",
      tags: ["Đám mây", "Hạ tầng CNTT", "Chuyển đổi số"],
    },
    {
      id: "lap-trinh-vien-tu-hoc",
      title: "Lập trình viên tự học: Làm sao để không bị 'lạc hướng'?",
      excerpt:
        "Bí quyết để duy trì động lực và lộ trình học tập hiệu quả cho lập trình viên tự học tại nhà.",
      author: {
        name: "Trần Văn Tùng",
        avatar: "assets/images/vialogo.png",
        role: "Mentor cộng đồng FreeCodeCamp Việt Nam",
      },
      date: "10/4/2025",
      readTime: "7 phút đọc",
      image: "assets/images/blog4.jpg",
      category: "Education",
      tags: ["Tự học", "Lập trình", "Hướng nghiệp"],
    },
  ];
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  const tags = [...new Set(blogPosts.flatMap((post) => post.tags))];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  const BlogPostCard = ({ post }: { post: BlogPost }) => (
    <Card className="overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-muted/50">
            {post.category}
          </Badge>
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <div className="text-xs">
            <p className="font-medium">{post.author.name}</p>
            <p className="text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{post.readTime}</span>
      </CardFooter>
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/blog/${post.id}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <PageHeader
        title="Blog & Insights"
        subtitle="Expert perspectives on technology trends, industry insights, and digital innovation"
        backgroundImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2153&auto=format&fit=crop"
      />

      <section className="section-container">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-3/4">
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-gray-800"
              />
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                    setSelectedTag(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24 border border-border/40">
              <h3 className="text-lg font-semibold mb-4">Các danh mục</h3>
              <div className="space-y-2 mb-6">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <button
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className={`text-sm w-full text-left py-1 px-2 rounded-md ${
                        selectedCategory === category
                          ? "bg-corporate-500 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4">Tags phổ biến</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTag === tag ? "bg-corporate-500" : ""
                    }`}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">
                  Đăng ký nhận bản tin của chúng tôi
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nhận những thông tin, xu hướng và kiến thức mới nhất được gửi
                  trực tiếp đến hộp thư của bạn.
                </p>
                <div className="space-y-2">
                  <Input type="email" placeholder="Email của bạn" />
                  <Button className="w-full">Đăng ký</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
