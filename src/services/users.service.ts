import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User.entity';


export const getPasswordHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const getLoginToken = async (user: User): Promise<string> => {
    return jwt.sign({ userId: user.id }, process.env.JWT_PRIVATE_KEY_USER);
}

export const validateUserPassword = async (user: User, password: string): Promise<boolean> => {
    return bcrypt.compare(password, user.password);
}