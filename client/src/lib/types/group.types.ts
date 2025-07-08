import { Base, Timestamps } from './common.types';
import { Message } from './message.types';
import { Post } from './post.types';
import { User } from './user.types';

export interface Group extends Base, Timestamps {
  name: string;
  isDM: boolean;
  post?: Post;
  contracts: string[]; // TODO: add Contract
  members: User[];
  lastRead: Map<string, Date>;
  lastMessage?: Message;
}
