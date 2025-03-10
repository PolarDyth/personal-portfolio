import express from "express";
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admins.controller";
import { adminAuth } from "../middleware/adminAuth";

const router = express.Router();

router.get("/", adminAuth, getAdmins);         // Retrieve all admins
router.post("/", adminAuth, createAdmin);        // Create a new admin
router.put("/:id", adminAuth, updateAdmin);      // Update an existing admin
router.delete("/:id", adminAuth, deleteAdmin);   // Delete an admin

export default router;