'use client';

import { SearchMap } from '@/components/ui/map/search-map';
import { PriceMarker } from '@/components/ui/map/price-marker';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SortMenu } from '@/components/ui/search/sort-menu';
import { useEffect, useState } from 'react';
import { useSortStore } from '@/stores/sort.store';
import { Post } from '@/lib/types/post.types';
import { SearchBarSm } from '@/components/ui/search/search-bar';
import { useSearch } from '@/hooks/use-search';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import Loading from '@/components/ui/commons/loading';

export default function SearchPage() {
  const { result, isFetching } = useSearch();
  const setCenter = useSortStore((state) => state.setCenter);
  const [posts, setPosts] = useState<Post[]>([]);
  const [mapShown, setMapShown] = useState(false);

  useEffect(() => {
    if (!result || !result.data || result.data.length === 0) {
      setPosts([]);
      return;
    }

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
      {isFetching || !result ? (
        <Loading />
      ) : posts.length == 0 ? (
        <div className="screen-message">No posts found</div>
      ) : (
        <div className="w-[90vw] m-auto mb-11">
          <div className="w-full flex justify-between py-4">
            <div>
              <div className="font-semibold text-3xl">Stays</div>
              <div className="flex items-center">
                Add places with
                <Star className="w-4 h-4 fill-orange-300 stroke-orange-300 mx-1" />
                to your wishlist to find housemates and get a better price
              </div>
            </div>
            <SortMenu posts={posts} setPosts={setPosts} />
          </div>
          <div className="flex gap-8 w-full">
            <PostingGrid
              posts={posts}
              isVertical={false}
              className={mapShown ? 'grid-cols-1 w-1/2' : 'grid-cols-2 w-full'}
            />
            {mapShown && (
              <SearchMap
                marker={PriceMarker}
                posts={posts}
                className={
                  'w-1/2 h-[90vh] sticky top-8 rounded-lg overflow-hidden'
                }
              />
            )}
          </div>
          <div className="flex flex-col items-center fixed right-2 top-1/2">
            <span className="rounded-xl shadow-lg px-3 mb-2 font-medium">
              Map
            </span>
            {mapShown ? (
              <button
                className="bg-primaryOrange p-3 rounded-full"
                onClick={() => setMapShown(false)}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            ) : (
              <button
                className="bg-primaryOrange p-3 rounded-full"
                onClick={() => setMapShown(true)}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
