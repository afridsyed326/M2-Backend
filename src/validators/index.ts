import { Request, Response, Next } from 'express';
import { validationResult } from 'express-validator';
import BadRequestError from '../errors/BadRequestError';

export const checkValidation = (req: Request, res: Response, next: Next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError({message: 'Invalid data', errors: errors.array()})
    }
    next();
}