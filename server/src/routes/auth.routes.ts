import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express"
import pool from "../config/db.config";
import argon2 from "argon2";
dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";
const REFRESH_KEY = process.env.REFRESH_SECRET || "default_refresh_secret";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const [admins] = await pool.query("SELECT * FROM admins WHERE username = ?", [username]);
    const admin = (admins as any[])[0];

    if (!admin) {
      console.log("Invalid credentials: admin not found");
      res.status(401).json({ error: "Invalid credentials, you are not an admin" });
      return;
    }

    const passwordMatch = await argon2.verify(admin.password, password);
    if (!passwordMatch) {
      console.log("Invalid credentials: password incorrect");
      res.status(401).json({ error: "Invalid credentials, password incorrect" });
      return;
    }

    const accessToken = jwt.sign({ adminId: admin.id }, SECRET_KEY, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ adminId: admin.id }, REFRESH_KEY, { expiresIn: "7d" });

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict"
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict"
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("access", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict"
  });

  res.clearCookie("refresh", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict"
  });

  res.json({ message: "Logged out successfully" });
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refresh;
  if (!refreshToken) {
    res.status(401).json({ error: "No refresh token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_KEY) as {adminId: number};
    const newAccessToken = jwt.sign({ adminId: decoded.adminId }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("access", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict"
    });

    res.json({ message: "Refreshed access token" });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ error: "Error refreshing token" });
  }
});

router.get("/me", async (req, res) => {
  const token = req.cookies.access;
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({adminId: (decoded as any).adminId});
    return;
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Not authenticated" });
  }
});

export default router;