import express from 'express';
import CarRoutes from './Routes/CarRoutes';
import httpErrorMiddleware from './middlewares/httpErrorMiddleware';

const app = express();

app.use(express.json());
app.use('/cars', CarRoutes);
app.use(httpErrorMiddleware);

export default app;
