import { Schema, model } from 'mongoose';
import { Group } from '../types/group.types';

const groupSchema = new Schema<Group>(
  {
    name: {
      type: String,
      trim: true,
    },
    isDM: {
      type: Boolean,
      default: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    contracts: [{ type: Schema.Types.ObjectId, ref: 'Contract' }],
  },
  { timestamps: true }
);

export default model<Group>('Group', groupSchema);
