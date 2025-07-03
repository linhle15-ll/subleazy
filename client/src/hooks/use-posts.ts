import { useEffect, useState } from 'react';
import { Post } from '@/lib/types/post.types';
import postService from '@/services/post.service';

export function usePosts(userId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        let result;

        if (userId) {
          result = await postService.getPostsByUserId(userId);
        } else {
          result = await postService.getAllPosts();
        }

        if (result.success) {
          setPosts(result.data!);
          setError(null);
        } else {
          setPosts([]);
          setError(result.error!);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return { posts, loading, error };
}
