import { Base, Timestamps } from './common.types';
import { Post } from './post.types';

export interface User extends Base, Timestamps {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  isVerified: boolean;
  profileImage: string;
  bio: string;
  sublesseeHistory: (string | Post)[];
}
