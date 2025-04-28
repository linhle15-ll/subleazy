import { Schema, model } from "mongoose";
import {Message} from "../types/messageType"

const messageSchema = new Schema<Message>(
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

messageSchema.index({ group: 1, createdAt: -1 });

export default model<Message>('Message', messageSchema);
