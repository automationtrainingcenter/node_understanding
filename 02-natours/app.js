import express from 'express';

import userRouter from './routes/userRoutes.js';
import tourRouter from './routes/tourRoutes.js';

// create an app
let app = express();

// add a middleware to read the data from the requests
app.use(express.json());

// create a own middleware
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

// route middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
