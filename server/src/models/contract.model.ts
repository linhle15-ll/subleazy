import { Schema, model } from 'mongoose';
import { Contract, ContractStatus } from '../types/contract.types';

const contractSchema = new Schema<Contract>(
  {
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
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
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
  },
  { timestamps: true }
);

// Index for faster queries
contractSchema.index({ post: 1 });
contractSchema.index({ sublessor: 1 });
contractSchema.index({ sublessees: 1 });
contractSchema.index({ status: 1 });
contractSchema.index({ createdAt: -1 });

export default model<Contract>('Contract', contractSchema);
