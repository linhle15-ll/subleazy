import { Types, ObjectId } from 'mongoose';
import { User } from './user.types';
import { Post } from './post.types';
import { Base } from './common.types';

export interface Wish extends Base {
  author: Types.ObjectId | ObjectId | User;
  post: Types.ObjectId | ObjectId | Post;
}
