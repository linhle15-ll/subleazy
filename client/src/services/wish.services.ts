import { Result } from '@/lib/types/common.types';
import { Wish } from '@/lib/types/wish.types';
import api from './api';

const wishService = {
    createWish: async (wish: {
        postId: string;
        userId: string;
    }): Promise<Result<Wish>> => {
        try {
        const response = await api.post('/wishes/createWish', wish);
        return {
            success: true,
            data: response.data,
        };
        } catch (error) {
        return {
            success: false,
            error: (error as any).response.data.error,
        };
        }
    },
    getWishListByUserId: async (userId: string): Promise<Result<Wish[]>> => {
        try {
        const response = await api.get(`/wishes/getByUserId/${userId}`);
        return {
            success: true,
            data: response.data,
        };
        } catch (error) {
        return {
            success: false,
            error: (error as any).response.data.error,
        };
        }
    },
};

export default wishService;
