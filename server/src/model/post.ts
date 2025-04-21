import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    media: [String],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sublessees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'closed'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rentFee: {
      type: Number,
      required: true,
    },
    // Optional field for additional fees
    utilitiesFee: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
    },
    // Additional unique/dynamic information of the room(s)
  },
  { timestamps: true },
);

export default model('Post', postSchema);
