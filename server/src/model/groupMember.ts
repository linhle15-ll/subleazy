import { Schema, model } from 'mongoose';

const groupMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent same user joining the same group twice
groupMemberSchema.index({ user: 1, group: 1 }, { unique: true });

export default model('GroupMember', groupMemberSchema);
