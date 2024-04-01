// MODULE IMPORTS
import express, { Router, Request, Response } from 'express';
import { userLoginController, userRegisterController } from '../controllers/auth.controller';
import { validateLogin, validateRegistration } from '../validators/auth.validators';
import { checkValidation } from '../validators';

const router: Router = express.Router();

router.post('/register', validateRegistration, checkValidation, userRegisterController)
router.post('/login', validateLogin, checkValidation, userLoginController)

export default router;