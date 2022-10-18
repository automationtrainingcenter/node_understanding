import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import userRouter from './routes/userRoutes.js';
import tourRouter from './routes/tourRoutes.js';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
// create an app
let app = express();

// add a middleware to read the data from the requests
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// create a own middleware
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// route middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
