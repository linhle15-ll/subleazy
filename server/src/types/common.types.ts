import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { UserPayload } from './userType';

export interface Base {
  _id?: ObjectId;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

declare module 'express' {
  // Fix ES2015 module declaration to remove namespace
  export interface Request {
    user?: UserPayload;
  }
}

export interface AuthRequest extends Request {
  user: UserPayload;
}
