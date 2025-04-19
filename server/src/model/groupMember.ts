import { Schema, model } from 'mongoose';

const groupMemberSchema = new Schema({
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

export default model('GroupMember', groupMemberSchema);
