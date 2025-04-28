import { Schema, model } from 'mongoose';
import { Wish } from '../types/wishType';

const wishSchema = new Schema<Wish>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

// Prevent same user wishing the same post twice
wishSchema.index({ user: 1, post: 1 }, { unique: true });

export default model<Wish>('Wish', wishSchema);
