import { ArrowDownWideNarrow, Filter, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../commons/popover';
import { TextSearch } from '../map/text-search';
import { useSortPlaces } from '@/hooks/use-sort-places';
import { useSortStore } from '@/lib/stores/sort.store';
import { Button } from '../button';
import { cn } from '@/lib/cn-utils';
import { Post } from '@/lib/types/post.types';
import { scoreAndSortPosts } from '@/lib/utils/sorting';

const SortButton = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      className={cn(
        'rounded-2xl border-2 text-xs font-normal',
        selected && 'border-lightOrange'
      )}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export function SortMenu({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}) {
  const price = useSortStore((state) => state.price);
  const setPrice = useSortStore((state) => state.setPrice);
  const queries = useSortStore((state) => state.queries);
  const setQueries = useSortStore((state) => state.setQueries);
  const places = useSortStore((state) => state.places);
  const setPlaces = useSortPlaces();

  const selectQuery = (index: number) => {
    setQueries(
      queries.map((q, i) => (index === i ? { ...q, selected: !q.selected } : q))
    );
  };

  const handleSort = () => {
    const selectedQueries = queries
      .filter((q) => q.selected)
      .map((q) => q.query);
    const scored = scoreAndSortPosts(posts, places, selectedQueries, price);
    const sortedPosts = scored.map(({ index }) => posts[index]);
    setPosts(sortedPosts);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="btn-primary">
          <Filter />
          <span>Sort by preferences</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-[90vw] sm:w-[28vw] flex-col bg-white space-y-2 p-2 focus:outline-none"
      >
        <div className="flex flex-col items-center border-b border-gray-300 pb-2">
          <span className="text-xl font-semibold">Sort by preferences</span>
          <span>Find your most suitable postings</span>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <span>
            Enter at most 5 places that you care about around your sublease
            location
          </span>
          <TextSearch onPlacesSelect={setPlaces} />
          <div>
            <SortButton
              text="Price"
              selected={price}
              onClick={() => setPrice(!price)}
            />
            {queries.map((q, i) => (
              <SortButton
                key={i}
                text={q.query}
                selected={q.selected}
                onClick={() => selectQuery(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex align-center cursor-pointer" onClick={() => {}}>
            <Trash2 className="h-4 w-4 text-grey" />
            <span className="font-medium text-left text-xs px-1">
              Clear all
            </span>
          </div>

          <div
            className="flex align-center cursor-pointer"
            onClick={handleSort}
          >
            <ArrowDownWideNarrow className="h-4 w-4 text-grey" />
            <span className="font-medium text-left text-xs px-1">Sort</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
