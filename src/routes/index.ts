// MODULE IMPORTS
import express, { Router } from "express";
import authRoutes from "./auth.routes";
import platformRoutes from "./platform.routes";
import authMiddleware from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/", authMiddleware, platformRoutes);

export default router;
