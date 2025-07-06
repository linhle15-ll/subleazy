import { ObjectId, Types } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { Post } from './post.types';
import { User } from './user.types';

export interface Group extends Base, Timestamps {
  name?: string;
  isDM: boolean;
  post?: Types.ObjectId | ObjectId | Post;
  contracts: (Types.ObjectId | ObjectId)[]; // TODO: add Contract
  members: (Types.ObjectId | ObjectId | User)[];
  lastRead: Map<string, Date>;
}
