import { create } from 'zustand';

interface WishlistState {
  wishlistPostIds: Set<string>;
  setWishlist: (postIds: string[]) => void;
  togglePostId: (postId: string) => void;
  isFavorite: (postId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistPostIds: new Set(),
  setWishlist: (postIds) => set({ wishlistPostIds: new Set(postIds) }),
  togglePostId: (postId) => {
    set((state) => {
      const newWishlist = new Set(state.wishlistPostIds);
      if (newWishlist.has(postId)) {
        newWishlist.delete(postId);
      } else {
        newWishlist.add(postId);
      }
      return { wishlistPostIds: newWishlist };
    });
  },
  isFavorite: (postId) => {
    return get().wishlistPostIds.has(postId);
  },
}));