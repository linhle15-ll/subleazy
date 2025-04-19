import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    sender: {
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

export default model('Message', messageSchema);
