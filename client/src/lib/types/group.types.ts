import { Base, Timestamps } from './common.types';
import { Message } from './message.types';
import { Post } from './post.types';
import { User } from './user.types';
import { Contract } from './contract.types';

export interface Group extends Base, Timestamps {
  name: string;
  isDM: boolean;
  post?: Post;
  contracts: Contract[];
  members: User[];
  lastRead: Record<string, Date>;
  lastMessage?: Message;
}
