import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Loader2 } from "lucide-react";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        
        if (!savedUser) {
          navigate("/");
          return;
        }

        const user = JSON.parse(savedUser);
        
        // Check if admin access is required
        if (requireAdmin && !user.isAdmin) {
          alert("Access Denied: Admin privileges required!");
          navigate("/dashboard");
          return;
        }

        // Check if regular user is trying to access admin route
        if (!requireAdmin && user.isAdmin) {
          navigate("/admin");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("user");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requireAdmin]);

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-content">
          <Loader2 className="loading-spinner" />
          <h2>Verifying Access...</h2>
          <p>Checking your permissions</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="auth-denied">
        <div className="auth-denied-content">
          <Shield className="denied-icon" />
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
