import postModel from '../models/post.model';
import { Post } from '../types/post.types';

const postService = {
  createPost: async (data: Post) => {
    const post = await postModel.create(data);
    return post;
  },
};

export default postService;
