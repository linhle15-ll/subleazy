import { useEffect, useState } from 'react';
import { Post } from '@/lib/types/post.types';
import postService from '@/services/post.service';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<{
    createdAt: string;
    _id: string;
  } | null>(null);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchPosts = async (cursor?: { createdAt: string; _id: string }) => {
    try {
      setLoading(true);

      const result = await postService.getAllPosts(
        cursor?.createdAt,
        cursor?._id
      );

      if (result.success && result.data) {
        const newPosts = result.data.posts || [];
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const filteredNew = newPosts.filter((p) => !existingIds.has(p._id));
          return [...prev, ...filteredNew];
        });
        setNextCursor(result.data.nextCursor || null);
        if (!initialLoaded && result.data.total !== undefined) {
          setTotal(result.data.total);
        }
        setError(null);
        setInitialLoaded(true);
      } else {
        setError(result.error || 'Failed to fetch posts');
      }
    } catch {
      setError('Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMore = () => {
    if (nextCursor) {
      fetchPosts(nextCursor);
    }
  };
  return {
    posts,
    loading,
    error,
    nextCursor,
    total,
    loadMore,
    hasMore: !!nextCursor,
    initialLoaded,
  };
}
