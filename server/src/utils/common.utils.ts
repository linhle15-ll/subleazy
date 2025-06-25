import { Request } from 'express';
import { AuthRequest } from '../types/common.types';
import { Post } from '../types/post.types';

export function getAuthRequest(req: Request): AuthRequest {
  if (!req.user) {
    throw new Error('Request is unauthorized');
  }
  return req as AuthRequest;
}

export function getPostAuthorId(post: Post): string {
  const authorId =
    typeof post.author === 'object' &&
    post.author !== null &&
    '_id' in post.author
      ? post.author._id?.toString()
      : post.author?.toString();
  
  if (!authorId) {
    throw new Error('Post does not have author');
  }
  return authorId;
}
