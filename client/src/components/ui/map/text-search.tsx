import { useTextSearch } from '@/hooks/use-text-search';
import { useSortStore } from '@/lib/stores/sort.store';
import { useEffect, useRef, useState } from 'react';

export function TextSearch({
  onPlacesSelect,
}: {
  onPlacesSelect: (places: google.maps.places.Place[]) => void;
}) {
  const queries = useSortStore((state) => state.queries);
  const setQueries = useSortStore((state) => state.setQueries);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const places = useTextSearch(query);

  const triggerSearch = () => {
    const q = inputRef.current?.value.trim() || '';
    if (!q) return;

    setQueries([...queries, { query: q, selected: false }]);
    setQuery(q);

    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (!places || places.length === 0) return;

    onPlacesSelect(places);
  }, [places]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full border-2 border-gray-300 focus:outline-none focus:border-lightOrange rounded-xl p-2"
      placeholder="Enter places you want to inspect distance"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();

          if (queries.length < 5) triggerSearch();
        }
      }}
    />
  );
}
