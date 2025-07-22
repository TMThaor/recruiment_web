import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub?: string; // Thường chứa user ID
  role?: string;
  // Các trường khác trong payload nếu cần
}

export const useAuth = (requiredRole?: string) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Kiểm tra role nếu requiredRole được chỉ định
      if (requiredRole && decoded.role !== requiredRole) {
        localStorage.removeItem("access_token");
        navigate("/unauthorized");
        setIsLoading(false);
        return;
      }

      // Lấy userId từ token (thường là trường 'sub')
      if (decoded.sub) {
        setUserId(decoded.sub);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("access_token");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, requiredRole]);

  return { userId, isLoading };
};