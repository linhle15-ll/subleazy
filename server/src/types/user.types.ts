import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { Post } from './post.types';

export interface User extends Base, Timestamps {
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
  isVerified: boolean;
  profileImage: string;
  bio: string;
  sublesseeHistory: (Types.ObjectId | ObjectId | Post)[];
}

export interface UserPayload {
  id: string;
  email: string;
}
