import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { Post } from './post.types';
import { Group } from './group.types';

export enum ContractStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  TERMINATED = 'terminated',
}

export interface Contract extends Base, Timestamps {
  title: string;
  post: Types.ObjectId | ObjectId | Post;
  sublessor: Types.ObjectId | ObjectId | User;
  sublessees: (Types.ObjectId | ObjectId | User)[];
  group: Types.ObjectId | ObjectId | Group;
  content: string;
  status: ContractStatus;
  sublessorSignature: string;
  sublesseesSignatures: string[];
}
