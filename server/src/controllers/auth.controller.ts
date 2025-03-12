import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express, { NextFunction } from "express";
import argon2 from "argon2";
import Admin from "../models/Admins";
dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret";
const REFRESH_KEY = process.env.REFRESH_SECRET || "default_refresh_secret";

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      console.log("Invalid credentials: admin not found");
      res
        .status(401)
        .json({ error: "Invalid credentials, you are not an admin" });
      return;
    }

    const passwordMatch = await argon2.verify(admin.password, password);
    if (!passwordMatch) {
      console.log("Invalid credentials: password incorrect");
      res
        .status(401)
        .json({ error: "Invalid credentials, password incorrect" });
      return;
    }

    const refreshToken = jwt.sign({ adminId: admin.id }, REFRESH_KEY, {
      expiresIn: "30s",
    });
    const accessToken = jwt.sign({ adminId: admin.id }, SECRET_KEY, {
      expiresIn: "5s",
    });

    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  res.clearCookie("access", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });

  res.clearCookie("refresh", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

// export const refresh = async (req: express.Request, res: express.Response) => {
//     const access = req.cookies.access;
//     if (!access) {
//       res.status(401).json({ error: "No refresh token provided" });
//       return;
//     }

//     try {
//       const decoded = jwt.verify(access, SECRET_KEY) as {adminId: number};
//       const newAccessToken = jwt.sign({ adminId: decoded.adminId }, SECRET_KEY, { expiresIn: "15s" });
//       console.log("This ran")

//       res.cookie("access", newAccessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production" ? true : false,
//         sameSite: "strict"
//       });

//       res.json({ message: "Refreshed access token" });
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       res.status(403).json({ error: "Error refreshing token" });
//     }
// };

export const refresh = async (req: express.Request, res: express.Response) => {
  try {
    const refreshToken = req.cookies.refresh;
    if (!refreshToken) {
      // Clear any potential access token if refresh token is missing
      res.clearCookie("access", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.clearCookie("refresh", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(401).json({ error: "No refresh token provided" });
      return;
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        REFRESH_KEY as string
      ) as { adminId: number };
      
      // Generate new access token
      const accessToken = jwt.sign(
        { adminId: decoded.adminId },
        SECRET_KEY as string,
        { expiresIn: "5s" } // Using a longer expiration for normal usage
      );
      
      // Set cookie
      res.cookie("access", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      console.log("Token refreshed successfully");
      res.status(200).json({ message: "Token refreshed successfully" });
      return;
    } catch (error) {
      // Token verification failed - clear both cookies
      res.clearCookie("access", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      res.clearCookie("refresh", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }
  } catch (error) {
    // Server error - also clear cookies to be safe
    res.clearCookie("access", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(500).json({ error: "Error refreshing token" });
    return;
  }
};

export const me = async (req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.access;
    if (!token) {
      throw {
        status: 401,
        message: "Not authenticated",
      };
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY as string) as { adminId: number };
      
      // Consider caching or optimizing this database call
      const admin = await Admin.findByPk(decoded.adminId, {
        attributes: ['id', 'username']
      });
      
      if (!admin) {
        res.status(404).json({ error: "Admin not found" });
        return;
      }
      
      res.json(admin);
      return;
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }
  } catch (error) {
    console.error("Error fetching admin:", error);
    next(error);
  }
};