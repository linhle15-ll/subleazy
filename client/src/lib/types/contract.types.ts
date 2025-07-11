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
  post: string | Post;
  sublessor: string | User;
  sublessees: (string | User)[];
  group: string | Group;
  content: string;
  status: ContractStatus;
  sublessorSignature: string;
  sublesseesSignatures: string[];
}

export interface ContractRequestBody extends Base, Timestamps {
  address: string;
  minPrice: number;
  maxPrice: number;
}
