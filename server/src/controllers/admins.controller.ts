import { Request, Response } from "express";
import pool from "../config/db.config";
import { z } from "zod";

const argon2 = require("argon2");

const adminSchema = z.object({
  username: z.string(),
  email: z.string().email({message: "Invalid email format"}),
  password: z.string(),
});

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const [admins] = await pool.query("SELECT * FROM admins");
    // Remove the password field before sending response
    const safeAdmins = (admins as any[]).map(({ password, ...rest }) => rest);
    res.json(safeAdmins);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all admins" });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const adminData = adminSchema.parse(req.body);
  if (!adminData) {
    res.status(400).json({ error: "Please provide admin data" });
    return;
  }

  try {
    const [existingAdmins] = await pool.query("SELECT id FROM admins WHERE email = ?", [adminData.email]);
    if ((existingAdmins as any[]).length > 0) {
      res.status(400).json({ error: "An admin with that email already exists" });
      return;
    }

    const hashedPassword = await argon2.hash(adminData.password);
    const [result] = await pool.query("INSERT INTO admins (username, email, password) VALUES (?, ?, ?)", [adminData.username, adminData.email, hashedPassword]);
    res.status(201).json({ message: "Admin created successfully ", adminId: (result as any).insertId });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Error creating admin" });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adminData = adminSchema.parse(req.body);
  if (!id || !adminData) {
    res.status(400).json({ error: "Admin ID and data are required" });
    return;
  }

  try {
    const hashedPassword = await argon2.hash(adminData.password);
    await pool.query("UPDATE admins SET username = ?, email = ?, password = ? WHERE id = ?", [adminData.username, adminData.email, hashedPassword, id]);
    res.json({ message: "Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating admin" });
  }
}

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Admin ID is required" });
    return;
  }

  try {
    await pool.query("DELETE FROM admins WHERE id = ?", [id]);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting admin" });
  }
}