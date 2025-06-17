import wishModel from '../models/wish.model';
import { Wish } from '../types/wish.types';

const wishService = {
  createWish: async (data: Wish) => {
    const wish = await wishModel.create({ user: data.user, post: data.post });

    return wish;
  },

  getWishListByUserId: async (userId: string) => {
    const wishes = await wishModel
      .find({ user: userId })
      .populate('post')
      .populate('user');
    return wishes;
  },
};

export default wishService;
