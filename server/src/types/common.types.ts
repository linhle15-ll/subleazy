import { ObjectId } from 'mongoose';

export interface Base {
  _id?: ObjectId;
}

export interface Timestamps {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
