import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Briefcase,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jwtDecode } from "jwt-decode";

const navItems = [
  {
    name: "Dịch vụ",
    path: "/dich-vu",
    submenu: [
      { name: "Hệ quản trị nội dung", path: "/dich-vu/he-quan-tri-noi-dung" },
      {
        name: "Nền tảng thương mại điện tử",
        path: "/services/ecommerce-solutions",
      },
      {
        name: "Phát triển blockchain - chuỗi khối",
        path: "/services/blockchain-development",
      },
      {
        name: "Trí tuệ nhân tạo và học máy",
        path: "/services/ai-machine-learning",
      },
      {
        name: "Giải pháp IoT - Internet vạn vật",
        path: "/services/iot-solutions",
      },
      {
        name: "Giải pháp chuyển đổi số",
        path: "/services/digital-transformation",
      },
    ],
  },
  {
    name: "Dự án tiêu biểu",
    path: "/case-studies",
    submenu: [
      { name: "Theo ngành nghề", path: "/case-studies/by-industry" },
      { name: "Theo dịch vụ", path: "/case-studies/by-service" },
    ],
  },
  {
    name: "Về chúng tôi",
    path: "/about",
    submenu: [
      { name: "Tổng quan về VIA", path: "/about/company-overview" },
      
    ],
  },
  {
    name: "Chuyên môn",
    path: "/expertise",
    submenu: [
      { name: "Công nghệ tại VIA", path: "/expertise/technologies" },
      { name: "Phương thức phát triển", path: "/expertise/methodologies" },
    ],
  },
  { name: "Tin tức/Công nghệ", path: "/blog" },
  { name: "Tuyển dụng", path: "/careers" },
  { name: "Liên hệ", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("VI");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token) as { role?: string };
        setIsLoggedIn(true);
        setUserRole(decoded.role || "");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("access_token");
      }
    } else {
      setIsLoggedIn(false);
      setUserRole("");
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUserRole("");
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm py-3"
          : "bg-transparent py-3"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            className="w-[180px] h-[65px] cursor-pointer object-cover"
            src="/assets/vialogo.png"
            alt=""
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) =>
            item.submenu ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`nav-link flex items-center ${
                      isActive(item.path) ? "active" : ""
                    }`}
                  >
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56"
                  sideOffset={5}
                  avoidCollisions={true}
                >
                  {item.submenu.map((subitem) => (
                    <DropdownMenuItem key={subitem.name} asChild>
                      <Link
                        to={subitem.path}
                        className="w-full px-4 py-2 cursor-pointer hover:bg-muted"
                      >
                        {subitem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("EN")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("VI")}>
                Tiếng Việt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center w-full px-4 py-2"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/application-history"
                    className="flex items-center w-full px-4 py-2"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Lịch sử ứng tuyển
                  </Link>
                </DropdownMenuItem>
                {userRole === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin"
                      className="flex items-center w-full px-4 py-2"
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-corporate-500 hover:bg-corporate-600">
              <Link to="/login">Đăng nhập</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-lg absolute w-full">
          <div className="container px-4 py-4 mx-auto">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="py-2">
                  {item.submenu ? (
                    <div className="space-y-2">
                      <div className="font-medium">{item.name}</div>
                      <div className="pl-4 flex flex-col space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            to={subitem.path}
                            className="text-muted-foreground hover:text-corporate-500"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`font-medium ${
                        isActive(item.path) ? "text-corporate-500" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      {language}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage("EN")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("VI")}>
                      Tiếng Việt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  asChild
                  className="bg-corporate-500 hover:bg-corporate-600"
                >
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
