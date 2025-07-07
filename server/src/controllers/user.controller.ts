import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import mongoose from 'mongoose';
import { getAuthRequest } from '../utils/common.utils';
import { Lifestyle } from '../types/user.types';

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
  
  // Lifestyle
  createOrUpdateLifestyle: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authReq = getAuthRequest(req);
      const lifestyle: Lifestyle = authReq.body.lifestyle;

      const userId = req.params.userId;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      if (userId !== authReq.user.id) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const updatedUser = await userService.createOrUpdateLifestyle(
        authReq.user.id,
        lifestyle
      );

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  },

  getLifestyle: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);

      const userId = req.params.userId;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      if (userId !== authReq.user.id) {
        res.status(403).json({ error: 'Forbidden' });
        return;
      }

      const user = await userService.getLifestyle(userId);
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
