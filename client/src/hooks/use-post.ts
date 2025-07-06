import postService from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';

export const usePost = (postId: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postService.getPost(postId),
    enabled: !!postId,
  });

  return { result: data, isFetching };
};
