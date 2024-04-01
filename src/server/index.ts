import { config } from 'dotenv';
import 'express-async-errors';
import AbstractApp from './AbstractApp';
import { AppDataSource } from './data-source';
config();
class Application extends AbstractApp {
  protected setupRoutes(): void {
    super.setupRoutes();
  }

  protected setupMiddlewares(): void {
    super.setupMiddlewares();
  }

  public runServer(): any {
    this.app.listen(process.env.PORT, () => {
      console.log(`\n🚀 app is running at http://localhost:${process.env.PORT}`);
    });
    return this.app;
  }


  public connectDB(): void {
    AppDataSource.initialize().then(async () => {

        console.log('DB connected!')
    
    }).catch(error => console.log(error))
  }
}

export default Application;