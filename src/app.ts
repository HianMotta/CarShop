import express from 'express';
import httpErrorMiddleware from './middlewares/httpErrorMiddleware';

const app = express();

app.use(express.json());
app.use(httpErrorMiddleware);

export default app;
