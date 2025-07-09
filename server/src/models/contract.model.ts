import { Schema, model } from 'mongoose';
import { Contract, ContractStatus } from '../types/contract.types';

const contractSchema = new Schema<Contract>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    sublessor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sublessees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(ContractStatus),
      default: ContractStatus.PENDING,
    },
    sublessorSignature: {
      type: String,
      required: true,
    },
    sublesseesSignatures: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Contract>('Contract', contractSchema);
