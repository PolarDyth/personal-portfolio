import StringToIcon from "@/app/utility/StringToIcon";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/projects';

export interface Project {
  id: number
  data: {
    title: string
    description: string
    images: {
      src: string
      alt: string
      description: string
    }[]
    skills: string[]
    github: string
    liveLink: string
    features: string[]
    challenges: string[]
    learnings: string[]
    stats: {
      label: string
      value: string
      icon: {
        name: keyof typeof StringToIcon
        styling?: string
      }
    }[]
    timeline: {
      title: string
      date: string
      description: string
    }[]
    testimonial: {
      quote: string
      author: {
        name: string
        role: string
        avatar: string
      }
    }
    insights: {
      title: string
      content: string
      icon: {
        name: keyof typeof StringToIcon
        styling?: string
      }
    }[]
    overview: string
    process: string
  }
  created_at: string
  updated_at: string
  slug: string
}

export const projectService = {
  async getProject(slug: string): Promise<Project> {
    const res = await axios.get(`${API_URL}/${slug}`);
    return res.data;
  },

  async getProjects(): Promise<Project[]> {
    const res = await axios.get(API_URL);
    return res.data;
  },

  async createProject(project: Project): Promise<Project> {
    const res = await axios.post(API_URL, {
      project,
      withCredentials: true,
    });
    return res.data;
  },

  async updateProject(project: Project): Promise<Project> {
    const res = await axios.put(`${API_URL}/${project.slug}`, {
      project,
      withCredentials: true,
    })
    return res.data;
  },

  async deleteProject(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    })
  }
};

export default projectService;