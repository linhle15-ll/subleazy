import { useEffect, useState } from 'react';
import { Post } from '@/lib/types/post.types';
import postService from '@/services/post.service';
import userService from '@/services/user.service';

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
          result = await userService.getPostsByUserId(userId);
        } else {
          result = await postService.getAllPosts();
        }
      
        if (result.success && result.data) {
          setPosts(Array.isArray(result.data) ? result.data : []);
          setError(null);
        } else {
          setError(result.error || 'Failed to fetch posts');
          setPosts([]);
        }
      } catch {
        setError('Failed to fetch posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}