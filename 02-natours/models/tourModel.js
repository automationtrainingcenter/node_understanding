import mongoose from 'mongoose';

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

export default Tour;
