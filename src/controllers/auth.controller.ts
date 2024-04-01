import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { User } from "../entity/User.entity";
import { AppDataSource } from "../server/data-source";
import BadRequestError from "../errors/BadRequestError";
import {
    getLoginToken,
    getPasswordHash,
    validateUserPassword,
} from "../services/users.service";

export const userRegisterController = async (req: Request, res: Response) => {
    const { email, username, password, confirmPassword, firstName, lastName } =
        req.body;
    try {
        if (password !== confirmPassword)
            throw new BadRequestError({
                message: "Password mismatch!",
            });

        const user = await AppDataSource.manager.findOne(User, {
            where: [{ email: username }, { username: username }],
        });

        if (user)
            throw new BadRequestError({ message: "User already registered" });

        const newPassowrd = await getPasswordHash(password);
        const newUser = new User();
        newUser.email = email;
        newUser.username = username;
        newUser.password = newPassowrd;
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        await AppDataSource.manager.save(newUser);

        const token = await getLoginToken(newUser);

        return apiResponse({
            res,
            message: "Registered successfully",
            data: { token, newUser },
        });
    } catch (error) {
        throw new BadRequestError({ message: error.message, errors: error });
    }
};

export const userLoginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await AppDataSource.manager.findOne(User, {
        where: [{ email: username }, { username: username }],
    });

    if (!user) throw new BadRequestError({ message: "Invalid Username/Email" });

    const isPasswordValid = await validateUserPassword(user, password);

    if (!isPasswordValid) {
        throw new BadRequestError({ message: "Invalid credentials" });
    }

    const token = await getLoginToken(user);
    delete user.password;
    return apiResponse({
        res,
        message: "Logged in successfully",
        data: { token, user },
    });
};
