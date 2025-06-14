import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import wishService from '../services/wish.service';
import { Wish } from '../types/wish.types';
import { getAuthRequest } from '../utils/common.utils';
import postService from '../services/post.service';
import { PostStatus } from '../types/enums';

const wishController = {
  createWish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: Wish = authReq.body;
      data.user = new Types.ObjectId(authReq.user.id);

      if (!data.post) {
        res.status(400).json({ error: 'Missing post' });
        return;
      }

      // post can be added to wish list only if it is not closed
      const post = await postService.getPost(data.post.toString());
      if (!post) {
        res.status(404).json({ error: 'Post not found.' });
        return;
      }

      if (post.status === PostStatus.CLOSED) {
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
