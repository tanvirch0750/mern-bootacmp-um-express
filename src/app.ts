import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// response to root route
app.get('/', (req: Request, res: Response) => {
    res.send('Root api route');
});

//Not Found
app.all('*', notFound);

// gloabla error handeling
app.use(globalErrorHandler);

export default app;
