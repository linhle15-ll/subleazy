import { useSortStore } from '@/lib/stores/sort.store';
import { useEffect, useState } from 'react';

export const useSortPlaces = () => {
  const queries = useSortStore((state) => state.queries);
  const sortPlaces = useSortStore((state) => state.places);
  const setSortPlaces = useSortStore((state) => state.setPlaces);

  const [places, setPlaces] = useState<google.maps.places.Place[]>([]);

  useEffect(() => {
    if (!places || places.length === 0) return;

    const parsedPlaces = places.map((place) => ({
      displayName: place.displayName ?? '',
      lat: place.location!.lat(),
      lng: place.location!.lng(),
      googleMapsUri: place.googleMapsURI ?? '',
      photo: place.photos?.[0]?.getURI(),
      query: queries[queries.length - 1].query,
    }));

    setSortPlaces([...sortPlaces, ...parsedPlaces]);
  }, [places]);

  return setPlaces;
};
