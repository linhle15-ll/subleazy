'use client';

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Trash2, X } from 'lucide-react';
import { TextSearch } from '../map/text-search';
import { useSortPlaces } from '@/hooks/use-sort-places';
import { useSortStore } from '@/stores/sort.store';
import { Button } from '../button';
import { cn } from '@/lib/utils/cn';
import { Post } from '@/lib/types/post.types';
import { scoreAndSortPosts } from '@/lib/utils/sorting';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/commons/dialog"

const SortButton = ({
  text,
  selected,
  onClick,
  onRemove,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
  onRemove?: () => void;
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
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X />
        </span>
      )}
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
  const setSortPlaces = useSortStore((state) => state.setPlaces);
  const releaseColor = useSortStore((state) => state.releaseColor);
  const setPlaces = useSortPlaces();

  const selectQuery = (index: number) => {
    setQueries(
      queries.map((q, i) => (index === i ? { ...q, selected: !q.selected } : q))
    );
  };

  const removeQuery = (index: number) => {
    const query = queries[index];
    setQueries(queries.filter((q) => q.query !== query.query));
    setSortPlaces(places.filter((p) => p.query !== query.query));
    releaseColor(query.query);
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
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn-secondary">
          <ArrowUpNarrowWide />
          <span>Sort by preferences</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white w-full sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sort by preferences</DialogTitle>
          <DialogDescription>
            Find your most suitable places to sublease
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 p-4">
          <span>
            Enter at most 5 places that you care about around your sublease
            location
          </span>
          <TextSearch onPlacesSelect={setPlaces} />
          <div className="flex flex-wrap gap-2">
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
                onRemove={() => removeQuery(i)}
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
      </DialogContent>
    </Dialog>
  );
}
