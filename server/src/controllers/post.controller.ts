import { Request, Response } from 'express';
import houseService from '../services/house.service';
import postService from '../services/post.service';
import { House } from '../types/house.types';
import { PostRequestBody } from '../types/post.types';
import { Types } from 'mongoose';
import { validateMedia, validateTime } from '../utils/validators';
// import { getAuthRequest } from "../utils/commonUtils";

const postController = {
  createPost: async (req: Request, res: Response) => {
    try {
      // TODO: Use authReq after jwt token is implemented
      // const authReq = getAuthRequest(req);
      // const data: PostRequestBody = authReq.body;
      // data.author = new Types.ObjectId(authReq.user.id);

      const data: PostRequestBody = req.body;
      data.author = new Types.ObjectId(req.body.user.id as string);

      if (
        !validateMedia(data.media) ||
        (data.availability.checkinTime &&
          !validateTime(data.availability.checkinTime)) ||
        (data.availability.checkoutTime &&
          !validateTime(data.availability.checkoutTime))
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
      throw error;
    }
  },
};

export default postController;
