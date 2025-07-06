import { Types, ObjectId } from 'mongoose';
import { Group } from './group.types';
import { User } from './user.types';
import { Base } from './common.types';

export interface GroupMember extends Base {
  user: Types.ObjectId | ObjectId | User;
  group: Types.ObjectId | ObjectId | Group;
  lastRead?: Date;
}
