import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string): string => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  );
  return accessToken;
};

export const generateRefreshToken = (userId: string): string => {
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );
  return refreshToken;
};
