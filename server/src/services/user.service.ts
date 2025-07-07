import userModel from '../models/user.model';
import { Lifestyle } from '../types/user.types';
import { lifestyleToVector } from '../utils/matching/compute.vector';
import { ObjectId } from 'mongoose';

const userService = {
  getUserById: async (userId: string | ObjectId) => {
    // select specific fields to be returned to the frontend
    const user = await userModel
      .findById(userId)
      .select('firstName lastName email profileImage bio');

    return user;
  },

  // Lifestyle form
  createOrUpdateLifestyle: async (userId: string, data: Lifestyle) => {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          lifestyle: data,
          lifestyleVector: lifestyleToVector(data),
        },
      },
      { new: true, runValidators: true }
    );
    return updatedUser;
  },

  getLifestyle: async (userId: string) => {
    const user = await userModel
      .findById(userId)
      .select('lifestyle lifestyleVector');
    return user;
  },

  searchUsers: async (query: string) => {
    const regex = new RegExp(query, 'i');
    const users = await userModel.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    })
      .select('firstName lastName email profileImage')
      .limit(5);

    return users;
  },
};

export default userService;
