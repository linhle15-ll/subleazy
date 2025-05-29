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
      default: false,
    },
  },
  { timestamps: true }
);

export default model<Group>('Group', groupSchema);
