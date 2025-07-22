import { useState } from "react";
import { Mail, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApiService } from "@/api/auth-api.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApiService.login({
        username: email,
        password,
      });

      localStorage.setItem("access_token", response.access_token);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gửi email reset tới:", forgotEmail);
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex justify-center bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-8 ">
            <h1 className="text-2xl font-bold text-corporate-500 text-center">
              Chào mừng đến với VIA
            </h1>
            <div className="flex justify-center">
              <img
                src="assets/vialogo.png"
                alt="VIA JSC"
                className="w-32 h-auto -mt-5"
              />
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Đăng nhập để nhận các cập nhật tức thì về những điều bạn quan tâm.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Vui lòng nhập tài khoản của bạn"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Vui lòng nhập mật khẩu của bạn"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-blue-500"
                />
                Ghi nhớ đăng nhập
              </label>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-corporate-100 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Đăng nhập"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center">
            Bạn không có tài khoản?{" "}
            <a
              href="#"
              className="text-corporate-100 font-medium hover:underline"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-center text-corporate-700 mb-2">
              Forgot Password
            </h3>
            <p className="text-sm text-center text-gray-500 mb-4">
              Enter your email to receive reset instructions.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0066d6] text-lg">
                    <Mail className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-corporate-500 hover:bg-corporate-600 text-white font-medium"
              >
                Send Reset Link
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
