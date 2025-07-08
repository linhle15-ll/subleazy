import wishModel from '../models/wish.model';
import { Wish } from '../types/wish.types';

const wishService = {
  createWish: async (data: Wish) => {
    const wish = await wishModel.create({ user: data.author, post: data.post });
    return wish;
  },

  getWishListByUserId: async (userId: string) => {
    const wishes = await wishModel
      .find({ author: userId })
      .populate('post')
      .populate('author');
    return wishes;
  },
};

export default wishService;
