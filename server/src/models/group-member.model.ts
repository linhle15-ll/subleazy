import { Schema, model } from 'mongoose';
import { GroupMember } from '../types/group-member.types';

const groupMemberSchema = new Schema<GroupMember>({
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
});

// Prevent same user joining the same group twice
groupMemberSchema.index({ user: 1, group: 1 }, { unique: true });

export default model<GroupMember>('GroupMember', groupMemberSchema);
