import { Base, Timestamps } from './common.types';
import { Post } from './post.types';

export interface User extends Base, Timestamps {
  firstName: string;
  lastName: string;
  passwordHash: string;
  institution: string;
  bio: string;
  email: string;
  isVerified: boolean;
  profileImage: string;
  sublesseeHistory: (string | Post)[];
}
