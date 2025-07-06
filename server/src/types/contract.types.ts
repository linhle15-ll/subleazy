import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { Post } from './post.types';

export enum ContractStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
}

export interface Contract extends Base, Timestamps {
  sublessor: Types.ObjectId | ObjectId | User;
  sublessees: (Types.ObjectId | ObjectId | User)[];
  post: Types.ObjectId | ObjectId | Post;
  content: string;
  status: ContractStatus;
}
