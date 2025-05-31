import { Types } from 'mongoose';
import UserModel from '../models/user.model';

const userService = {
  getUserById: async (userId: Types.ObjectId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    // select specific fields to be returned to the frontend
    const user = await UserModel.findById(userId).select({
      firstName: 1,
      lastName: 1,
      email: 1,
      profileImage: 1,
      institution: 1,
      bio: 1,
    });

    return user;
  },
};

export default userService;
