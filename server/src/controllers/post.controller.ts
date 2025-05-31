import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { House } from '../types/house.types';
import { PostRequestBody } from '../types/post.types';
import { Types } from 'mongoose';
import { validatePostData } from '../utils/validators';
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

      if (validatePostData(data)) {
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

  // This function is for published posts only and not for drafts
  getPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const post = await postService.getPost(postId);

      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      if (post.status !== 'active') {
        res.status(403).json({ error: 'Unauthorized to view this post' });
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  updatePost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Uncomment when auth middleware is merged
      // const authReq = getAuthRequest(req);
      // const updates: Partial<PostRequestBody> = authReq.body;
      // updates.author = new Types.ObjectId(authReq.user.id);

      const { postId } = req.params; //authReq.params;
      const updates: Partial<PostRequestBody> = req.body; // authReq.body;
      const existingPost = await postService.getPost(postId);

      if (!existingPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      // if (existingPost.author.toString() !== authReq.user.id || existingPost.status === 'closed') {
      //   res.status(403).json({ error: 'Unauthorized to edit this post' });
      //   return;
      // }

      const allowedFields = [
        'title',
        'description',
        'media',
        'houseInfo',
        'bedroomInfo',
        'bathroomInfo',
        'whoElse',
        'amenities',
        'convenience',
        'price',
        'rules',
        'availability',
      ];

      const filteredData = Object.fromEntries(
        Object.entries(updates).filter(([key]) => allowedFields.includes(key))
      );

      if (
        validatePostData({
          ...existingPost.toObject(),
          ...updates,
        } as PostRequestBody)
      ) {
        res.status(400).json({ error: 'Invalid data' });
        return;
      }

      const updatedPost = await postService.updatePost(postId, filteredData);

      if (!updatedPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json(updatedPost);
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
