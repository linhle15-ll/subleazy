import { Request, Response } from 'express';
import User from '../models/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../services/auth.service';
import { comparePassword } from '../services/password.service';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    const isMatch = await comparePassword(password, existingUser.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const accessToken = generateAccessToken(existingUser._id.toString());
    const refreshToken = generateRefreshToken(existingUser._id.toString());

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
