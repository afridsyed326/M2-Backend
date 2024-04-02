import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { getUserTokenBalance } from "../services/wallet.service";

export const getWalletsOverview = async (req: Request, res: Response) => {
    const balance = await getUserTokenBalance(req.user.id)
    const data = {
        total: balance.creditSum - balance.debitSum,
        totalCredit: balance.creditSum,
        totalDebit: balance.debitSum,
    }

    return apiResponse({
        res,
        data
    });
};
