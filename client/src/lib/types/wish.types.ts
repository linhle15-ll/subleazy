import { User } from './user.types';
import { Post } from './post.types';
import { Base } from './common.types';

export interface Wish extends Base {
  user: string | User;
  post: string | Post;
}
