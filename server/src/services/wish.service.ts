import wishModel from '../models/wish.model';
import { Wish } from '../types/wish.types';

const wishService = {
  createWish: async (data: Wish) => {
    const wish = await wishModel.create(data);
    return wish;
  },
};

export default wishService;
