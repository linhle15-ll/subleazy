import { NextFunction, Request, Response } from 'express';
import wishService from '../services/wish.service';
import { Wish } from '../types/wish.types';
import Post from '../models/post.model';
import mongoose, { Types } from 'mongoose';
import { getAuthRequest } from '../utils/common.utils';
import userService from '../services/user.service';
import { lifestyleFilter } from '../utils/matching/filter';
import { cosineSimilarity } from '../utils/matching/compare.vectors';
import { User } from '../types/user.types';

const wishController = {
  createWish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: Wish = authReq.body;
      data.user = new Types.ObjectId(authReq.user.id);

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

  deleteWish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const userId = authReq.user.id;
      const postId = authReq.params.postId || authReq.body.postId;

      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      if (!postId || !mongoose.isValidObjectId(postId)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      const result = await wishService.deleteWish(userId, postId);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  getWishListByUserId: async (req: Request, res: Response, next: NextFunction) => {
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

  getMatchesByPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const userId = authReq.user.id;

      const postId = authReq.params.postId;

      const interestedUsers = (await wishService.getInterestedUsersByPost(
        postId
      )) as User[];
      const matches = interestedUsers.filter(
        (user) => user._id?.toString() !== userId
      );

      const currentUser = await userService.getLifestyle(userId);
      if (!currentUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const currLifestyle = currentUser.lifestyle;
      const vector = currentUser.lifestyleVector;

      console.log("Current User Lifestyle Vector: ", vector);
      console.log("Current User Lifestyle: ", currLifestyle); 

      if (!currLifestyle || !vector || vector.length === 0) {
        const result = matches.map((user) => ({ user, matchPercent: null }));
        console.log("Missing lifestyle or vector")
        res.status(200).json(result);
        return;
      }

      const matchResults = await Promise.all(
        matches.map(async (user) => {
          const detailedUser = await userService.getLifestyle(
            user._id!.toString()
          );

          console.log("Detailed User: ", detailedUser)

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { lifestyle, lifestyleVector, ...safeUser } = user;

          if (!detailedUser?.lifestyle) {
            console.log("User has no lifestyle data");
            return {
              user: safeUser,
              matchPercent: null,
            };
          }

          if (
            detailedUser?.lifestyle &&
            !lifestyleFilter(currLifestyle, detailedUser?.lifestyle)
          ) {
            const matchPercent =
              100 *
              cosineSimilarity(vector, detailedUser.lifestyleVector ?? []);

            console.log("Match Percent: ", matchPercent)

            return {
              user: safeUser,
              matchPercent: Math.round(matchPercent),
            };
          }

          return {
            message: 'Lifestyle filter not passed',
            user: safeUser,
            matchPercent: null,
          };
        })
      );

      matchResults.sort((a, b) => {
        if (a.matchPercent === null) return 1;
        if (b.matchPercent === null) return -1;
        return b.matchPercent - a.matchPercent;
      });

      res.status(200).json(matchResults);
    } catch (error) {
      next(error);
    }
  },
};

export default wishController;
