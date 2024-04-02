import express, { Router } from "express";
import { sendCoins } from "../controllers/transaction.controller";

const router: Router = express.Router();

router.get("/", () => {});
router.post("/send", sendCoins);

export default router;
