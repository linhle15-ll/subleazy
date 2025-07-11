import { Request } from 'express';
import { ObjectId, Types } from 'mongoose';
import { UserPayload } from './user.types';

export interface Base {
  _id?: Types.ObjectId | ObjectId;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}

export interface AuthRequest extends Request {
  user: UserPayload;
}
