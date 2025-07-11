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
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastRead: {
      type: Map,
      of: Date,
    },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

groupSchema.index({ members: 1 });

export default model<Group>('Group', groupSchema);
