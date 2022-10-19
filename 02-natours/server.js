import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('Connected DB Successfully...'));

app.listen(port, () => {
  console.log('App is running on port ', port);
});
