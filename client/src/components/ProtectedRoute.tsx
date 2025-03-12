import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, logout, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Force an auth check when the component mounts
  useEffect(() => {
    console.log("Protected route mounted, checking auth...");
    console.log("Current auth state:", { isAuthenticated, loading });
    
    const verifyAuth = async () => {
      try {
        await checkAuth();
        console.log("Auth check complete, isAuthenticated:", isAuthenticated);
      } catch (error) {
        console.error("Auth verification failed:", error);
        setAuthError("Authentication verification failed");
      } finally {
        setAuthChecked(true);
        console.log("Auth check finished, setting authChecked to true");
      }
    };

    verifyAuth();
  }, []); // Include isAuthenticated and loading in dependencies

  // Add extra debug log to track state changes
  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, loading, authChecked });
  }, [isAuthenticated, loading, authChecked]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err: unknown) {
      console.error("Logout error:", err);
    }
  };

  // Show loading until both the initial auth check is complete and the loading state is false
  if (loading || !authChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // Show error if auth check failed
  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">{authError}</div>
        <Button onClick={() => navigate("/login")}>Return to Login</Button>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  console.log("User is authenticated, rendering children");
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
};

export default ProtectedRoute;