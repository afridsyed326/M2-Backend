import {Request, Response} from 'express';
import { apiResponse } from '../utils/apiResponse';
import { User } from '../entity/User.entity';
import { AppDataSource } from '../server/data-source';
import BadRequestError from '../errors/BadRequestError';
import { getLoginToken, getPasswordHash } from '../services/users.service';


export const userRegisterController = async (req: Request, res: Response) => {

    const { email, username, password, firstName, lastName } = req.body;
    try {
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
        message: 'Registered successfully',
        data: { token, newUser }
    })
  } catch (error) {
     throw new BadRequestError({message: error.message, errors: error})
  }


}