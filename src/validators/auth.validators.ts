import { check, validationResult } from 'express-validator';

export const validateRegistration = [
    check('email').isEmail(),
    check('username').isLength({ min: 5 }),
    check('password').isLength({ min: 8 }),
    check('firstName').notEmpty(),
    check('lastName').notEmpty()
];

export const validateLogin = [
    check('username').notEmpty().withMessage('Email or username is required'),
    check('password').notEmpty().withMessage('Password is required')
];