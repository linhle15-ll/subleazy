import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { Group } from './group.types';

export interface Message extends Base, Timestamps {
  content: string;
  sender: string | User;
  group: string | Group;
}
