import { Request, Response } from 'express';
//import User from '../models/user.model';
import { UserPayload } from '../types/userType';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../services/auth.service';

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.status(401).json({ error: 'Unauthorized - No refresh token' });
    return;
  }
  //console.log('jwt cookie:', cookies.jwt);

  const refreshToken = cookies.jwt;

  //const foundUser = await User.findOne((user: typeof User.prototype) => user.refreshToken === refreshToken);
  //if (!foundUser) {
  //  res.status(403).json({ error: 'Forbidden - No user found' });
  //  return;
  //}

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as UserPayload;
    const decodedUserId = decoded.id;
    // if (!decodedUserId) {
    //   res.status(403).json({ error: 'Forbidden - No user ID found' });
    //   return;
    // }
    // if (foundUser._id.toString() !== decodedUserId) {
    //   res.status(403).json({ error: 'Forbidden - User ID mismatch' });
    //   return;
    // }

    const accessToken = generateAccessToken(decodedUserId);
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: 'Forbidden' });
  }
};
