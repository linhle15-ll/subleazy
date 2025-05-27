import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authService = {
  generateAccessToken: (userId: string, userEmail: string): string => {
    const accessToken = jwt.sign(
      { id: userId, email: userEmail },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30m' }
    );
    return accessToken;
  },

  generateRefreshToken: (userId: string, userEmail: string): string => {
    const refreshToken = jwt.sign(
      { id: userId, email: userEmail },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );
    return refreshToken;
  },

  hashPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  },
};

export default authService;
