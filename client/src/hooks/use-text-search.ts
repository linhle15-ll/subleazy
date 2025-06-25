import { useSortStore } from '@/stores/sort.store';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export const useTextSearch = (
  textQuery: string,
  requestOptions: Partial<google.maps.places.SearchByTextRequest> = {}
) => {
  const placesLib = useMapsLibrary('places');
  const [places, setPlaces] = useState<google.maps.places.Place[]>([]);
  const center = useSortStore((state) => state.center);

  useEffect(() => {
    if (!placesLib) return;

    if (!textQuery) return;

    if (!center.lat || !center.lng) return;

    const { lat, lng } = center;

    google.maps.places.Place.searchByText({
      ...requestOptions,
      textQuery,
      fields: ['displayName', 'location', 'googleMapsURI', 'photos'],
      region: 'US',
      locationBias: {
        center: { lat, lng },
        radius: 25000,
      },
    }).then((res) => setPlaces(res.places));
  }, [textQuery, center, placesLib]);

  return places;
};
