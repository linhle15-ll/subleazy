import { NextFunction, Request, Response } from 'express';
import wishService from '../services/wish.service';
import { Wish } from '../types/wish.types';
import Post from '../models/post.model';
import mongoose, { Types } from 'mongoose';
import { getAuthRequest } from '../utils/common.utils';

const wishController = {
  createWish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: Wish = authReq.body;
      data.author = new Types.ObjectId(authReq.user.id);

      if (!data.post || !data.author) {
        res.status(400).json({ error: 'Missing post or user' });
        return;
      }

      // post can be added to wish list only if it is not closed
      const postDoc = await Post.findById(data.post);
      if (!postDoc) {
        res.status(404).json({ error: 'Post not found.' });
        return;
      }

      if (postDoc && postDoc.status === 'closed') {
        res.status(400).json({ error: 'Post is unavailable.' });
        return;
      }

      const wish = await wishService.createWish(data);
      res.status(201).json(wish);
    } catch (error) {
      next(error);
    }
  },
  getWishListByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authReq = getAuthRequest(req);

    try {
      const userId = authReq.params.id;

      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const wishList = await wishService.getWishListByUserId(userId);

      if (!wishList || (Array.isArray(wishList) && wishList.length === 0)) {
        res.status(200).json([]);
        return;
      }

      res.status(200).json(wishList);
    } catch (error) {
      next(error);
    }
  },
};

export default wishController;
