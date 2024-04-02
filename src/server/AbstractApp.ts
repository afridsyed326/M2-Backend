import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { handleFinalError, logError, ErrorHandlingMiddleware } from './errorHandlers';
import errorHandler from '../middlewares/error.middleware';
import rootRoute from '../routes';

import { ApiResponseInterface, apiResponse } from '../utils/apiResponse';

abstract class AbstractApp {
  protected app: Express;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandlers();
  }
  // Default empty implementations for methods
  protected setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({
      origin: ['https://m2x-api.afrid.dev', 'https://m2x.afrid.dev', 'http://localhost:3000'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    // add body parser
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use('/', express.static('public'));
  }
  protected setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => res.sendFile(__dirname + '/public/index.html'));
    this.app.use('/', rootRoute);
    this.app.use((req, res) => {
      const data: ApiResponseInterface = {
        res,
        message: 'Page Not Found',
        code: 404,
        success: false,
      };
      apiResponse(data);
    });
  }
  protected setupErrorHandlers(): void {
    this.app.use(logError as ErrorHandlingMiddleware); // Use the logError middleware
    this.app.use(handleFinalError as ErrorHandlingMiddleware); // Use the handleFinalError middleware
    this.app.use(errorHandler);
  }
}

export default AbstractApp;