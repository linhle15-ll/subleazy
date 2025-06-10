import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { PostRequestBody } from '../types/post.types';
import mongoose, { Types } from 'mongoose';
import { validateMedia, validateTime } from '../utils/validators';
import { parseGoogleMapPlaces } from '../utils/parsers';
import { getAuthRequest, getPostAuthorId } from '../utils/common.utils';
import { PostStatus } from '../types/enums';

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
      const reqUserId = authReq.user.id;

      // find in the posts collection user's posts by id as an author
      const userId = authReq.params.id;

      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const posts = await postService.getPostsByUserId(userId);

      const filteredPosts = posts.filter((post) => {
        if (post.status !== PostStatus.PENDING) return true;
        return userId === reqUserId;
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

  getPostById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const reqUserId = authReq.user.id;

      const postId = req.params.id;

      if (!postId || !mongoose.isValidObjectId(postId)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      const post = await postService.getPostById(postId);

      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }

      const authorId = getPostAuthorId(post);

      if (post.status === PostStatus.PENDING && authorId !== reqUserId) {
        res.status(403).json({ error: 'Unauthorized to view this post' });
        return;
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
