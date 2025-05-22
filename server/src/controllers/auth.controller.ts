import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import authService from '../services/auth.service';

const authController = {
  handleSignUp: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        passwordHash: await authService.hashPassword(password),
      });

      const accessToken = authService.generateAccessToken(
        newUser._id.toString(),
        newUser.email
      );

      const refreshToken = authService.generateRefreshToken(
        newUser._id.toString(),
        newUser.email
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // secure: true, // Uncomment in production
      });

      res.status(201).json({
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  handleLogIn: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.status(400).json({ error: 'User not found' });
        return;
      }

      const isPasswordValid = await authService.comparePassword(
        password,
        existingUser.passwordHash
      );
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }

      const accessToken = authService.generateAccessToken(
        existingUser._id.toString(),
        existingUser.email
      );

      const refreshToken = authService.generateRefreshToken(
        existingUser._id.toString(),
        existingUser.email
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // secure: true, // Uncomment in production
      });

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
