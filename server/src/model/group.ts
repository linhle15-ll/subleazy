import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  isDM: {
    type: Boolean,
    default: false,
  },
});

export default model('Group', groupSchema);
