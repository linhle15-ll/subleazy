import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { Group } from './group.types';

export interface Message extends Base, Timestamps {
  content: string;
  sender?: Types.ObjectId | ObjectId | User;
  group: Types.ObjectId | ObjectId | Group;
}
