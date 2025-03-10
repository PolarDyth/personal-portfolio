import express from "express";
import { getProjects, createProject, updateProject, deleteProject, getProject } from "../controllers/projects.controller";
import { adminAuth } from "../middleware/adminAuth";

const router = express.Router();

router.get("/", getProjects);         // Retrieve all projects
router.post("/", adminAuth, createProject);        // Create a new project
router.put("/:id", adminAuth, updateProject);      // Update an existing project
router.delete("/:id", adminAuth, deleteProject);   // Delete a project

router.get("/:slug", getProject);

export default router;