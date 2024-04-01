import express, { Router } from "express";
import { getWalletsOverview } from "../controllers/dashboard.controller";

const router: Router = express.Router();

router.get("/overview", getWalletsOverview);

export default router;
