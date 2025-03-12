import dotenv from "dotenv";
import express from "express"
import { login, logout, me, refresh } from "../controllers/auth.controller";
dotenv.config();

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", me);

export default router;