import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { House } from '../types/house.types';
import { PostRequestBody } from '../types/post.types';
import { Types } from 'mongoose';
import { validateMedia, validateTime } from '../utils/validators';
// import { getAuthRequest } from "../utils/commonUtils";

const postController = {
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Use authReq after jwt token is implemented
      // const authReq = getAuthRequest(req);
      // const data: PostRequestBody = authReq.body;
      // data.author = new Types.ObjectId(authReq.user.id);

      const data: PostRequestBody = req.body;
      data.author = new Types.ObjectId(req.body.user.id as string);

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

  //Might need to be modified to also work on the sublesee side
  getPostById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const post = await postService.getPostById(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  editPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const updates: Partial<PostRequestBody> = req.body;
      const existingPost = await postService.getPostById(postId);
      if (!existingPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // All other fields can be sent as full objects from frontend
      const fieldsToMerge: (keyof PostRequestBody)[] = [
        'houseInfo',
        'bedroomInfo',
        'bathroomInfo',
        'rules',
      ];

      for (const field of fieldsToMerge) {
        if (updates[field]) {
          const existingValue =
            existingPost[field as keyof typeof existingPost] || {};
          const updateValue = updates[field] || {};
          updates[field] = { ...existingValue, ...updateValue };
        }
      }

      if (updates.availability) {
        updates.availability = {
          ...existingPost.availability,
          ...updates.availability,
        };
      }

      if (updates.rules?.quietHours) {
        updates.rules.quietHours = {
          ...existingPost.rules.quietHours,
          ...updates.rules.quietHours,
        };
      }

      if (
        (updates.media && !validateMedia(updates.media)) ||
        !validateTime(updates.availability?.checkinTime as string) ||
        !validateTime(updates.availability?.checkoutTime as string) ||
        (updates.rules?.quietHours &&
          (!validateTime(updates.rules.quietHours.from as string) ||
            !validateTime(updates.rules.quietHours.to as string)))
      ) {
        res.status(400).json({ error: 'Invalid data' });
        return;
      }

      const updatePost = await postService.editPost(postId, updates);

      if (!updatePost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json(updatePost);
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
