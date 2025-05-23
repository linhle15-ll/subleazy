import { NextFunction, Request, Response } from 'express';
import wishService from '../services/wish.service';
import { Wish } from '../types/wish.types';
import Post from '../models/post.model';
// import { getAuthRequest } from '../utils/commonUtils';

const wishController = {
  createWish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //TODO: authReq
      const data: Wish = req.body;

      if (!data.post || !data.user) {
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
};

export default wishController;
