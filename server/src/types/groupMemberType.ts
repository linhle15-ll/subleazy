import { ObjectId } from 'mongoose';
import { Group } from './groupType';
import { User } from './userType';
import { Base } from './commonType';

export interface GroupMember extends Base {
  user: ObjectId | User;
  group: ObjectId | Group;
}
