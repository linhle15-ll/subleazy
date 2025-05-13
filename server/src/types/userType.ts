import { ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types'; // Fix path
import { Post } from './post.types'; // Fix path

export interface User extends Base, Timestamps {
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
  isVerified: boolean;
  profileImage: string;
  sublesseeHistory: [ObjectId | Post];
}

export interface UserPayload {
  id: string;
  email: string;
}
