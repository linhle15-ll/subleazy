import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { House } from '../types/house.types';
import { PostRequestBody } from '../types/post.types';
import { Types } from 'mongoose';
import { validateMedia, validateTime } from '../utils/validators';
import { getAuthRequest } from '../utils/common.utils';

const postController = {
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: PostRequestBody = authReq.body;
      data.author = new Types.ObjectId(authReq.user.id);

      if (
        !validateMedia(data.media) ||
        !validateTime(data.availability.checkinTime as string) ||
        !validateTime(data.availability.checkoutTime as string) ||
        !validateTime(data.rules?.quietHours?.from as string) ||
        !validateTime(data.rules?.quietHours?.to as string)
      ) {
        res.status(400).json({ error: 'Invalid data' });
        return;
      }

      const houseData: House = {
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        lat: data.lat,
        long: data.long,
      };
      const house = await houseService.getOrCreateHouse(houseData);
      data.house = house._id;

      const post = await postService.createPost(data);

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  },

  searchPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Partial<PostRequestBody> = req.body;
      if (!data.zip && !data.state && (!data.lat || !data.long)) {
        res.status(400).json({ error: 'Missing location' });
        return;
      }

      const posts = await postService.searchPosts(data);

      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
