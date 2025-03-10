import axios from "axios";

const API_URL = "http://localhost:5000/api/admins";

export interface Admin {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export const adminService = {
  async getAdmins(): Promise<Admin[]> {
    const response = await axios.get<Admin[]>(API_URL);
    return response.data;
  },
};