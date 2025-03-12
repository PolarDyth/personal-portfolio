// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface User {
  adminId: string;
  // Add other user properties as needed
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, { 
        withCredentials: true 
      });

      if (response.status === 403) {
        
      }
      
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (username: string, password: string) => {

      const response = await axios.post(
        `${API_URL}/auth/login`, 
        { username, password },
        { withCredentials: true }
      );
      
      await checkAuth();
      return response;
  }, [checkAuth]);

  const logout = useCallback(async () => {
      await axios.post(
        `${API_URL}/auth/logout`, 
        {},
        { withCredentials: true }
      );
      
      setIsLoggedIn(false);
      setUser(null);
  }, []);

  return { 
    isLoggedIn, 
    user, 
    loading, 
    login,
    logout,
    refreshAuth: checkAuth
  };
}
