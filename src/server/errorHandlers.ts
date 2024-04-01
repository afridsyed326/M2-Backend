import { Request, Response, NextFunction } from 'express';


export interface ErrorHandlingMiddleware {
    (err: Error, req: Request, res: Response, next: NextFunction): void;
  }

export const logError: ErrorHandlingMiddleware = (err, req, res, next) => {
  // Log the error or send it to a 3rd party error monitoring software
  console.log('Calling logError middleware');
  next(err);
};


export const handleFinalError: ErrorHandlingMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.log('Calling handleFinalError middleware');
  next(err);
};

export default {
  logError,
  handleFinalError,
};