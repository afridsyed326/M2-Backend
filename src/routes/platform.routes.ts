import express, { Router } from "express";
import dashboardRoutes from "./dashboard.routes";
import transactionRoutes from "./transaction.routes";
const router: Router = express.Router();

router.use("/dashboard", dashboardRoutes);
router.use("/transactions", transactionRoutes);

export default router;
