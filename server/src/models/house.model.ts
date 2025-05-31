import { Schema, model } from 'mongoose';
import { House } from '../types/house.types';

const houseSchema = new Schema<House>({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
  },
  nearbyAmenities: {
    supermarkets: [
      {
        displayName: String,
        shortAddress: String,
        lat: Number,
        long: Number,
        googleMapsUri: String,
        photo: String,
      },
    ],
    publicTransports: [
      {
        displayName: String,
        shortAddress: String,
        lat: Number,
        long: Number,
        googleMapsUri: String,
        photo: String,
      },
    ],
  },
});

houseSchema.index({ zip: 1 });

export default model<House>('House', houseSchema);
