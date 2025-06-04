import { NextFunction, Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { PostRequestBody } from '../types/post.types';
import mongoose, { Types } from 'mongoose';
import { validateMedia, validateTime } from '../utils/validators';
import { parseGoogleMapPlaces } from '../utils/parsers';
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
      // find in the posts collection user's posts by id as an author
      const userId = req.params.id;

      if (!userId || !mongoose.isValidObjectId(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const userPosts = await postService.getPostsByUserId(userId);

      if (!userPosts || (Array.isArray(userPosts) && userPosts.length === 0)) {
        res.status(200).json([]);
        return;
      }

      res.status(200).json(userPosts);
    } catch (error) {
      next(error);
    }
  },

  getAllPosts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
