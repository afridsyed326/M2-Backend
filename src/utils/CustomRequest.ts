import { Request } from "express";
import { User } from "../entity/User.entity";

export interface CustomRequest extends Request {
    user: User;
    [x: string]: any;
}
