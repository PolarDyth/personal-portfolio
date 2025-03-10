import axios from "axios";

const API_URL = "http://localhost:5000/api/";

export const authService = {
  async login(username: string, password: string) {
    try {
      const res = await axios.post(
        `${API_URL}auth/login`,
        { username, password },
        { withCredentials: true }
      );

      return res;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },
  async logout() {
    try {
      const res = await axios.post(
        `${API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  }
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return api.request(originalRequest);
      } catch (error) {
        console.log("Error refreshing token:", error);
        authService.logout();
      }
    }
  }
);
