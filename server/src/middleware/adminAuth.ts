import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "1234";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies) {
    res.status(401).json({ error: "Unauthorized: Cookies are not available" });
    return;
  }
  const token = req.cookies.auth;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token"});
    return;
  }
};