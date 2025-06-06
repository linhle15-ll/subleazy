'use client';

import { SearchBarSm } from '@/components/ui/search/search-bar';
import { useSearch } from '@/hooks/use-search.hook';
import { PostingGrid } from '@/components/ui/posting/posting-grid';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const result = useSearch();
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/posting?id=${id}`);
  };

  const handleToggleFavorite = (id: string) => {
    // TODO: Implement wish list functionality
    console.log('Toggle favorite for post:', id);
  };

  return (
    <>
      <SearchBarSm />
      {!result || result.data?.length == 0 ? (
        <div className="flex items-center justify-center h-[500px] text-xl">
          No posts found
        </div>
      ) : (
        <div className="w-[90vw] m-auto pt-8">
          <PostingGrid
            posts={result.data!}
            isVertical={false}
            onViewDetails={handleViewDetails}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      )}
    </>
  );
}
