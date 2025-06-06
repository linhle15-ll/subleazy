import { Result } from '@/lib/types/common.types';
import { User } from '@/lib/types/user.types';
import api from './api';

const userService = {
  getUserById: async (id: string): Promise<Result<User>> => {
    try {
      const response = await api.post(`http://localhost:5000/api/users/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error as any).response.data.error,
      };
    }
  }
}

export default userService