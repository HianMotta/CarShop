import { ErrorRequestHandler } from 'express';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  res.status(status).json({ message });
};

export default httpErrorMiddleware;
