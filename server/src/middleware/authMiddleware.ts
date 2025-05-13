import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/userType';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Request is unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string // Fix JWT_SECRET to ACCESS_TOKEN_SECRET
    ) as UserPayload;
    req.user = decoded;

    next();
  } catch (err) {
    console.error((err as Error).stack);
    res.status(403).json({ error: 'Token is invalid or expired' }); // Fix 401 to 403
    return;
  }
};
