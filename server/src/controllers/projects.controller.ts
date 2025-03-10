import { Request, Response } from "express";
import pool from "../config/db.config";
import { z } from "zod";
import { RowDataPacket } from "mysql2/promise";

interface ProjectRow extends RowDataPacket {
  id: number;
  slug: string;
  data: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define a schema for each image in the images array
const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
  description: z.string().optional(),
});

const iconSchema = z.object({
  name: z.string(),          // e.g., "Zap", "Clock", etc.
  styling: z.string().optional() // e.g., "h-5 w-5 text-primary"
});

// Define a schema for each stat item
const statSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: iconSchema,
});

// Define a schema for each timeline item
const timelineSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
});

// Define a schema for testimonial
const testimonialSchema = z.object({
  quote: z.string(),
  author: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().url(),
  }),
});

// Define a schema for insights (if needed)
const insightSchema = z.object({
  title: z.string(),
  content: z.string(),
  icon: iconSchema,
});




// Define the main project schema
const projectDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(imageSchema),
  skills: z.array(z.string()),
  githubLink: z.string().url(),
  liveLink: z.string().url().optional(),
  features: z.array(z.string()),
  challenges: z.array(z.string()),
  learnings: z.array(z.string()),
  stats: z.array(statSchema).optional(),
  timeline: z.array(timelineSchema).optional(),
  testimonial: testimonialSchema.optional(),
  insights: z.array(insightSchema).optional(),
  overview: z.string(),
  process: z.string(),
});

const projectSchema = z.object({
  slug: z.string(),
  data: projectDataSchema,
});


export const getProjects = async (req: Request, res: Response) => {
  try {
    const [projects] = await pool.query("SELECT * FROM projects");
    res.json(projects);
  } catch (error) {
    res.status(500).json({error: "Error fetching all projects"});
  }
};

export const createProject = async (req: Request, res: Response) => {
  const projectData = req.body;
  if (!projectData) {
    res.status(400).json({error: "Please provide project data"});
    return;
  }

  try {

    const validatedData = projectSchema.parse(projectData);

    const [result] = await pool.query("INSERT INTO projects (slug, data) VALUES (?, ?)", [validatedData.slug ,JSON.stringify(validatedData.data)]);
    res.status(201).json({message: "Project created successfully ", projectId: (result as any).insertId});
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({error: "Error creating project"});
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const projectData = req.body;
  if (!id || !projectData) {
    res.status(400).json({error: "Project ID and data are required"})
    return;
  }

  try {

    const validatedData = projectSchema.parse(projectData);

    await pool.query("UPDATE projects SET data = ? WHERE id = ?", [JSON.stringify(validatedData), id]);
    res.json({message: "Project updated successfully"});
  } catch (error) {
    res.status(500).json({error: "Error updating project"});
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({error: "Project ID is required"});
    return;
  }

  try {
    await pool.query("DELETE FROM projects WHERE id = ?", [id]);
    res.json({message: "Project deleted successfully"});
  } catch (error) {
    res.status(500).json({error: "Error deleting project"});
  }
};

export const getProject = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    res.status(400).json({ error: "Project slug is required" });
    return;
  }

  try {
    // Query the database, specifying that the result rows are ProjectRow[]
    const [rows] = await pool.query<ProjectRow[]>(
      "SELECT * FROM projects WHERE slug = ?",
      [slug]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // rows[0] is the first ProjectRow that matches
    res.json(rows[0]);
    return;
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Error fetching project" });
    return;
  }
};