import { body, validationResult } from "express-validator";


export const validateTransfer = [
    body('walletAddress')
        .notEmpty().withMessage('M2X wallet address is required')
        .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Invalid M2X wallet address'),

    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isFloat({ min: 10 }).withMessage('Amount must be a positive number'),
];