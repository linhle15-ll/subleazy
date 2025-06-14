import { useFilterStore } from '@/stores/filter.store';
import { useEffect, useState } from 'react';

export const useFilterLocation = () => {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const [place, setPlace] = useState<google.maps.places.Place | null>(null);

  useEffect(() => {
    setFilters({
      ...filters,
      city: undefined,
      state: undefined,
      zip: undefined,
      lat: undefined,
      long: undefined,
    });

    if (!place) return;

    let city: string | null = null;

    // Search by the first sufficient component
    for (const component of place.addressComponents || []) {
      if (component.types.includes('street_number')) {
        const lat = place.location?.lat();
        const long = place.location?.lng();
        setFilters({
          ...filters,
          lat,
          long,
        });
        if (lat && long) return;
      } else if (
        component.types.includes('neighborhood') ||
        component.types.includes('locality')
      ) {
        city = component.longText;
      } else if (component.types.includes('administrative_area_level_1')) {
        setFilters({
          ...filters,
          state: component.shortText ? component.shortText : undefined,
          city: city ? city : undefined,
        });
        return;
      } else if (component.types.includes('postal_code')) {
        setFilters({
          ...filters,
          zip: component.longText ? component.longText : undefined,
        });
        return;
      }
    }
  }, [place]);

  return setPlace;
};
