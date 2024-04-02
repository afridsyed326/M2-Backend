import express, { Router } from "express";
import {
    getTransactionHistory,
    sendCoins,
} from "../controllers/transaction.controller";

const router: Router = express.Router();

router.get("/", getTransactionHistory);
router.post("/send", sendCoins);

export default router;
