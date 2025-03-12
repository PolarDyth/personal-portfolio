// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/AuthService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string } | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  // Check if user is authenticated - improve error handling and logging
  const checkAuth = useCallback(async () => {
    if (isCheckingAuth) {
      console.log("Auth check already in progress, skipping");
      return;
    }
    
    console.log("Starting auth check");
    try {
      setIsCheckingAuth(true);
      setLoading(true);
      
      const userData = await authService.getMe();
      console.log("Auth check successful, user data received:", userData);
      
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      setIsCheckingAuth(false);
      console.log("Auth check complete, isAuthenticated:", isAuthenticated);
    }
  }, [isCheckingAuth]);

  // Run auth check on mount
  useEffect(() => {
    console.log("AuthProvider mounted, checking auth...");
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    console.log("Login attempt for user:", username);
    try {
      await authService.login(username, password);
      console.log("Login API call successful");
      await checkAuth(); // Re-check auth status after login
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to allow components to handle the error
    }
  };

  const logout = async () => {
    console.log("Logout initiated");
    try {
      await authService.logout();
      console.log("Logout successful");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local auth state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};