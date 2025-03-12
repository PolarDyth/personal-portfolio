import { Request, Response } from "express";
import pool from "../config/db.config";
import { z } from "zod";
import Admin from "../models/Admins";

const argon2 = require("argon2");

const adminSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: "Invalid email format" }),
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
  const { username, email, password } = adminSchema.parse(req.body);
  if (!username || !email || !password) {
    res.status(400).json({ error: "Please provide admin data" });
    return;
  }

  try {
    const existingAdmins = await Admin.findOne({ where: { email } });
    if (existingAdmins) {
      res
        .status(400)
        .json({ error: "An admin with that email already exists" });
      return;
    }

    const hashedPassword = await argon2.hash(password);

    const newAdmin = await Admin.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Admin created successfully ", adminId: newAdmin.id });
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
    const admin = await Admin.findOne({ where: { id } });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    await admin.update({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
    });
    res.json({ message: "Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating admin" });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Admin ID is required" });
    return;
  }

  try {
    await Admin.findOne({ where: { id } })
      .then((admin) => {
        if (!admin) {
          res.status(404).json({ error: "Admin not found" });
          return;
        }
        admin.destroy();
      })
      .finally(() => {
        res.json({ message: "Admin deleted successfully" });
      });
  } catch (error) {
    res.status(500).json({ error: "Error deleting admin" });
  }
};
