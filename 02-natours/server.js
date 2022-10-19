import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('Connected DB Successfully...'));

// create a tour schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour price is required'],
  },
});

// create a model from the schema
const Tour = mongoose.model('Tour', tourSchema);

app.listen(port, () => {
  console.log('App is running on port ', port);
});
