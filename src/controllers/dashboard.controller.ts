import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";

export const getWalletsOverview = async (req: Request, res: Response) => {
    return apiResponse({
        res,
        data: 10,
    });
};
