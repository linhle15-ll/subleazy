import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { User } from '../types/user.types';
import mongoose, { Types } from 'mongoose';

const userController = {
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }
      const user: User | null = await userService.getUserById(
        new Types.ObjectId(userId)
      );
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
