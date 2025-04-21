import { Schema, model } from 'mongoose';

const wishSchema = new Schema({
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
}, { timestamps: true });

// Prevent same user wishing the same post twice
wishSchema.index({ user: 1, post: 1 }, { unique: true });

export default model('Wish', wishSchema);
