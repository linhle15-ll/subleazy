import wishModel from '../models/wish.model';
import { Wish } from '../types/wish.types';

const wishService = {
  createWish: async (data: Wish) => {
    const wish = await wishModel.create({ user: data.user, post: data.post });

    return wish;
  },
};

export default wishService;
