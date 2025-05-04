import postModel from '../models/postModel';
import { Post } from '../types/postType';

const postService = {
  createPost: async (data: Post) => {
    const post = await postModel.create(data);
    return post;
  },
};

export default postService;
