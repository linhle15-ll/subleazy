import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { PostRequestBody } from '../types/post.types';
import mongoose, { Types } from 'mongoose';
import { validatePostData } from '../utils/validators';
import { parseGoogleMapPlaces } from '../utils/parsers';
import { getAuthRequest, getPostAuthorId } from '../utils/common.utils';
import { PostStatus } from '../types/enums';

const postController = {
  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: PostRequestBody = authReq.body;
      data.author = new Types.ObjectId(authReq.user.id);

      if (validatePostData(data)) {
        res.status(400).json({ error: 'Invalid data' });
        return;
      }

      const house = await houseService.getOrCreateHouse({
        address: data.address,
        zip: data.zip,
      });

      if (
        !house.nearbyAmenities ||
        (house.nearbyAmenities.supermarkets.length === 0 &&
          house.nearbyAmenities.publicTransports.length === 0)
      ) {
        const spmkPlaces = await houseService.fetchNearbyPlaces(
          data.lat,
          data.long,
          true
        );
        const transportPlaces = await houseService.fetchNearbyPlaces(
          data.lat,
          data.long,
          false
        );

        const supermarkets = parseGoogleMapPlaces(spmkPlaces);
        const publicTransports = parseGoogleMapPlaces(transportPlaces);

        await houseService.updateHouse(house._id, {
          nearbyAmenities: {
            supermarkets,
            publicTransports,
          },
        });
      }

      data.house = house._id;
      const post = await postService.createPost(data);

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  },

  getPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);

      const postId = req.params.postId;
      if (!postId || !mongoose.isValidObjectId(postId)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      const post = await postService.getPostWithAuthor(postId);
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      if (
        post.status === PostStatus.PENDING &&
        getPostAuthorId(post) !== authReq.user.id
      ) {
        res.status(403).json({ error: 'Unauthorized to view this post' });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  editPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const updates: Partial<PostRequestBody> = authReq.body;

      const postId = authReq.params.postId;
      const existingPost = await postService.getPost(postId);

      if (!existingPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      if (
        getPostAuthorId(existingPost) !== authReq.user.id ||
        existingPost.status === PostStatus.CLOSED
      ) {
        res.status(403).json({ error: 'Unauthorized to edit this post' });
        return;
      }

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

      const editedPost = await postService.updatePost(postId, filteredData);
      if (!editedPost) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      res.status(200).json(editedPost);
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

  getPostsByUserId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);

      // find in the posts collection user's posts by id as an author
      const userId = authReq.params.userId;
      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const posts = await postService.getPostsByUserId(userId);

      const filteredPosts = posts.filter((post) => {
        if (post.status !== PostStatus.PENDING) return true;
        return userId === authReq.user.id;
      });

      res.status(200).json(filteredPosts);
    } catch (error) {
      next(error);
    }
  },

  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postService.getAllPosts();
      const filteredPosts = posts.filter(
        (post) => post.status !== PostStatus.PENDING
      );

      res.status(200).json(filteredPosts);
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
