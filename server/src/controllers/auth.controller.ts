import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import authService from '../services/auth.service';

const authController = {
  handleSignUp: async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, institution, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      const isAcademicEmail = await authService.validateAcademicEmail(email);
      if (!isAcademicEmail) {
        res.status(400).json({ error: 'Invalid academic email' });
        return;
      }

      // Send verification email
      const newUser = await User.create({
        firstName,
        lastName,
        institution,
        email,
        passwordHash: await authService.hashPassword(password),
        isVerified: true,
      });

      res.status(201).json({
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          institution: newUser.institution,
          email: newUser.email,
        },
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

  handleRefreshToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
      res.status(401).json({ error: 'Unauthorized - No refresh token' });
      return;
    }

    const refreshToken = cookies.refreshToken;

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as { id: string; email: string };

      const existingUser = await User.findById(decoded.id);
      if (!existingUser) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      const accessToken = authService.generateAccessToken(
        existingUser._id.toString(),
        existingUser.email
      );

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  handleLogOut: async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
      res.sendStatus(204);
      return;
    }

    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // Set to true in production
      });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
