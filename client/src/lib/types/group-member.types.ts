import { Group } from './group.types';
import { User } from './user.types';
import { Base } from './common.types';

export interface GroupMember extends Base {
  user: string | User;
  group: string | Group;
}
