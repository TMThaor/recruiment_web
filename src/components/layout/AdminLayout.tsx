import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  LayoutDashboard,
  FileText,
  BookOpen,
  Users,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChartBarStacked,
  CircleUser,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  useAuth("admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const navItems = [
    { name: "Bảng điều khiển", path: "/admin", icon: LayoutDashboard },
    { name: "Tin tuyển dụng", path: "/admin/jobs", icon: BookOpen },
    { name: "Danh mục", path: "/admin/categories", icon: ChartBarStacked },
    { name: "File đa phương tiện", path: "/admin/media", icon: Image },
    { name: "Liên hệ", path: "/admin/contact", icon: Mail },
    { name: "Nhân viên", path: "/admin/staff", icon: Users },
    {
      name: "Tài khoản quản trị",
      path: "/admin/manager-account",
      icon: CircleUser,
    },
    { name: "Cài đặt", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-sm transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-corporate-500">VIA., </span>
              <span>JSC</span>
              <span className="ml-1 text-sm text-muted-foreground">CMS</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md group transition-colors ${
                  isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-800 text-corporate-500"
                    : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 ${
                    isActive(item.path)
                      ? "text-corporate-500"
                      : "group-hover:text-foreground"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 mt-8">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-2 px-3">
                Tài khoản
              </div>
              <Link
                to="/admin/profile"
                className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                  <span className="text-sm font-medium">AE</span>
                </div>
                <div>
                  <p className="text-sm font-medium">admin</p>
                  <p className="text-xs text-muted-foreground">admin</p>
                </div>
              </Link>

              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 mr-3" />
                <span>Quay lại trang chủ</span>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between border-b bg-white dark:bg-gray-900 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
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
                className="mr-2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm">
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
                className="mr-2"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
