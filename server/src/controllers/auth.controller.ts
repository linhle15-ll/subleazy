import { Request, Response, NextFunction } from 'express';
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
};

export default authController;
