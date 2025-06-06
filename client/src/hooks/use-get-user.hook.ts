import { useState, useEffect } from 'react';
import { User } from '@/lib/types/user.types';
import userService from '@/services/user.service';

export function useGetUser(userId: string | undefined) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(true);
      setError('User ID is required');
      setUser(null);
      return;
    }
    
    userService.getUserById(userId)
      .then(result => {
        if (result.success && result.data) {
          setUser(result.data);
          setError(null);
        } else {
          setError(result.error || 'Failed to fetch user');
          setUser(null);
        }
      })
      .catch(() => {
        setError('Failed to fetch user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}