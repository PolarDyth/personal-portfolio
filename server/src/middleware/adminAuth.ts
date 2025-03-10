import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies) {
    res.status(401).json({ error: "Unauthorized: Cookies are not available" });
    return;
  }
  
  const accessToken = req.cookies.access;
  const refreshToken = req.cookies.refresh;
  
  if (!accessToken && !refreshToken) {
    res.status(401).json({ error: "Unauthorized: No tokens provided" });
    return;
  }

  try {
    if (!SECRET_KEY) {
      res.status(500).json({ error: "Internal Server Error: Secret key is not defined" });
      return;
    }

    let decoded;
    if (accessToken) {
      decoded = jwt.verify(accessToken, SECRET_KEY);
    } else {
      decoded = jwt.verify(refreshToken, SECRET_KEY);
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token" });
    return;
  }
};