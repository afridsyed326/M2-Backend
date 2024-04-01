import Application from './server';
const app = new Application();
app.runServer();
app.connectDB();
export default app;