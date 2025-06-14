import { usePostCreateStore } from '@/stores/post-create.store';

export const usePostCreateDate = (field: 'startDate' | 'endDate') => {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const date = post.availability?.[field] as Date;

  const setDate = (date: Date | undefined) => {
    setPost({
      ...post,
      availability: {
        ...post.availability,
        [field]: date,
      },
    });
  };

  return { date, setDate };
};
