import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import mongoose from 'mongoose';

const userController = {
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  searchUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query.q as string;
      if (!query || query.length === 0) {
        res.status(400).json({ error: 'Missing search query' });
        return;
      }

      const users = await userService.searchUsers(query);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
