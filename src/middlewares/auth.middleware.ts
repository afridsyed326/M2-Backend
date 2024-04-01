import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import BadRequestError from "../errors/BadRequestError";
import { AppDataSource } from "../server/data-source";
import { User } from "../entity/User.entity";

interface DecodedPayload {
    userId: number;
}

const excludeAuth = ["auth"];

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    //Get token from the header
    if (excludeAuth.includes(req.path.split("/")[1])) {
        next();
    } else {
        var token = req.headers.authorization || null;

        if (!token) {
            throw new BadRequestError({
                code: 401,
                message: "No token found",
            });
        }
        token = token.slice(7);

        //verify the token
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_PRIVATE_KEY_USER || ""
            ) as DecodedPayload;
            const user = await AppDataSource.manager.findOne(User, {
                where: [{ id: decoded.userId }],
            });
            req.user = user;

            if (!user) {
                throw new BadRequestError({
                    code: 401,
                    message: "Unauthorized",
                });
            }
        } catch (err) {
            throw new BadRequestError({
                code: 401,
                message: "Unauthorized",
            });
        }

        next();
    }
};
export default authMiddleware;
