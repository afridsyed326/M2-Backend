// MODULE IMPORTS
import express, { Router, Request, Response } from 'express';
import { userRegisterController } from '../controllers/auth.controller';
import { validateRegistration } from '../validators/auth.validators';
import { checkValidation } from '../validators';

const router: Router = express.Router();

router.post('/register', validateRegistration, checkValidation, userRegisterController)

export default router;