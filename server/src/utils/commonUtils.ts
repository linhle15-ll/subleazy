import { Request } from 'express';
import { AuthRequest } from '../types/commonType';

export function getAuthRequest(req: Request): AuthRequest {
  if (!req.user) {
    throw new Error('Request is unauthorized');
  }
  return req as AuthRequest;
}
