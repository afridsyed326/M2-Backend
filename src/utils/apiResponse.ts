import { Response } from 'express';


export interface ApiResponseInterface {
    res: Response;
    message?: string;
    code?: number;
    err?: Error;
    errors?: any;
    success?: boolean;
    data?: any;
}

const apiResponse = (params: ApiResponseInterface) => {
  const { res, message = 'OK', code = 200, err, errors, success = true, data } = params;
  return res.status(code).json({
    success: success,
    status: success,
    statusCode: code,
    message: code === 500 ? 'Request Failed' : message,
    errors,
    stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
    data,
  });
};

export { apiResponse };