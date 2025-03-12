import axios from "axios";

const API_URL = "http://localhost:5000/api/";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Track if we're currently refreshing to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Function to add request to the queue
const subscribeToTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Function to retry queued requests
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Only attempt refresh for 401 errors (not 403)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/me")
    ) {
      originalRequest._retry = true;
      console.log("401 error detected, attempting token refresh");
      
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await axios.post(
            `${API_URL}auth/refresh`,
            {},
            { withCredentials: true }
          );
          isRefreshing = false;
          onTokenRefreshed("refreshed");
          console.log("Token refreshed successfully, retrying original request");
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          console.error("Token refresh failed:", refreshError);
          throw refreshError;
        }
      } else {
        // If we're already refreshing, wait for the token
        console.log("Refresh already in progress, queuing request");
        return new Promise((resolve) => {
          subscribeToTokenRefresh(() => {
            console.log("Token refreshed, processing queued request");
            resolve(api(originalRequest));
          });
        });
      }
    }
    throw error;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't log auth-related errors
    if (error.config.url.includes('/auth/')) {
      // Create a modified error without the status code
      const sanitizedError = new Error('Authentication error');
      return Promise.reject(sanitizedError);
    }
    
    // Pass through other errors
    return Promise.reject(error);
  }
);

export const authService = {
  async login(username: string, password: string) {
    console.log("Calling login API");
    try {
      const response = await axios.post(
        `${API_URL}auth/login`,
        { username, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  async logout() {
    console.log("Calling logout API");
    try {
      const response = await api.post("auth/logout");
      return response.data;
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },

  async getMe() {
    console.log("Calling getMe API");
    try {
      const response = await api.get("auth/me");
      return response.data;
    } catch (error) {
      console.error("getMe API error:", error);
      throw error;
    }
  }
};
