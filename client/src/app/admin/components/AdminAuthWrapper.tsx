import { useState } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const { isLoggedIn, loading, login, logout } = useAuth();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setError("");
    setIsSubmitting(true);
    
    try {
      await login(username, password);
      setPassword(""); // Clear password from memory for security
    } catch (err: unknown) {
      console.error("Login error:", err);
      
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Authentication failed");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: unknown) {
      console.error("Logout error:", err);
      // Consider showing a user-friendly notification
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lock size={20} /> Admin Login
            </CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/20 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // User is authenticated, show children
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
}