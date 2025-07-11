import { ObjectId, Types } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { Post } from './post.types';
import { User } from './user.types';
import { Message } from './message.types';
import { Contract } from './contract.types';

export interface Group extends Base, Timestamps {
  name?: string;
  isDM: boolean;
  post?: Types.ObjectId | ObjectId | Post;
  contracts: (Types.ObjectId | ObjectId | Contract)[];
  members: (Types.ObjectId | ObjectId | User)[];
  lastRead: Map<string, Date>;
  lastMessage?: Types.ObjectId | ObjectId | Message;
}
