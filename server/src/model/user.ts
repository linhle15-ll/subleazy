import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.(edu)$/,
    },
    profileImage: {
      type: String,
      // default: add a default profile image link here
    },
    // Additional stats to add later if necessary
  },
  { timestamps: true },
);

export default model('User', userSchema);
