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
};

export default authController;
