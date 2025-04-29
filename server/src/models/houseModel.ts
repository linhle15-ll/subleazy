import { Schema, model } from 'mongoose';
import { House } from '../types/houseType';

const houseSchema = new Schema<House>({
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
  // Thís will be fetched by us from external API or something
  // amenities: {
  //   type: [String],
  //   // required: true,
  // },
});

// Map display is auto => pin by house location => search by house first
houseSchema.index({ city: 1, state: 1 });
houseSchema.index({ zip: 1 });

export default model<House>('House', houseSchema);
