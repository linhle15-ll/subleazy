import { Schema, model } from 'mongoose';
import { User } from '../types/user.types';

const userSchema = new Schema<User>(
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      // default: add a default profile image link here
    },
    sublesseeHistory: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Where user has been a sublessee
    // Additional stats to add later if necessary
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);
