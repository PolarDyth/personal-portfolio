import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projects.routes";
import adminRoutes from "./routes/admins.routes";
import authRoutes from "./routes/auth.routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(cors({
  origin: process.env.DOMAIN || "http://localhost:5173", // Replace with your actual domain
  optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/", limiter)
app.use("/api/projects", projectRoutes);
app.use("/api/admins", adminRoutes);



export default app;