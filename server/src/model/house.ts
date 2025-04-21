import { Schema, model } from 'mongoose';

const houseSchema = new Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  // Additional generic/static information of the house (beds, baths, amenities, etc.)
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    // required: true,
  },
});

export default model('House', houseSchema);
