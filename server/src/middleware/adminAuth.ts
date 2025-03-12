import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const REFRESH_KEY = process.env.REFRESH_SECRET;

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access;
    
    if (!accessToken) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    if (!SECRET_KEY) {
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    const decoded = jwt.verify(accessToken, SECRET_KEY) as { adminId: number };
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
    return;
  }
};