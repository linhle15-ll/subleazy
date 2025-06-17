'use client';

import { CustomMap } from '@/components/ui/map/custom-map';
import { PriceMarker } from '@/components/ui/map/price-marker';
import { ChevronLeft } from 'lucide-react';
import { SortMenu } from '@/components/ui/search/sort-menu';
import { useEffect, useState } from 'react';
import { useSortStore } from '@/stores/sort.store';
import { Post } from '@/lib/types/post.types';
import { SearchBarSm } from '@/components/ui/search/search-bar';
import { useSearch } from '@/hooks/use-search';
import { PostingGrid } from '@/components/ui/posting/posting-grid';

export default function SearchPage() {
  const { result } = useSearch();
  const setCenter = useSortStore((state) => state.setCenter);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!result || !result.data || result.data.length === 0) return;

    const postsData = result.data;
    const avgLat =
      postsData.reduce((acc, post) => acc + post.lat, 0) / postsData.length;
    const avgLng =
      postsData.reduce((acc, post) => acc + post.long, 0) / postsData.length;

    setCenter({ lat: avgLat, lng: avgLng });
    setPosts(postsData);
  }, [result]);

  return (
    <>
      <SearchBarSm />
      <CustomMap
        marker={PriceMarker}
        posts={posts}
        className="h-[500px] w-[70vw] m-auto p-4"
      />
      {posts.length == 0 ? (
        <div className="flex items-center justify-center h-[500px] text-xl">
          No posts found
        </div>
      ) : (
        <div className="w-[90vw] m-auto">
          <div className="w-full flex justify-between py-4">
            <div className="font-semibold text-3xl">Stays</div>
            <SortMenu posts={posts} setPosts={setPosts} />
          </div>
          <PostingGrid posts={posts} isVertical={false} />
          <button className="bg-primaryOrange p-3 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
