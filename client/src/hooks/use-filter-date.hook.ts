import { useFilterStore } from '@/lib/stores/filter.store';

export const useFilterDate = (field: 'startDate' | 'endDate') => {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const date = filters.availability?.[field] as Date;

  const setDate = (date: Date | undefined) => {
    setFilters({
      ...filters,
      availability: {
        ...filters.availability,
        [field]: date,
      },
    });
  };

  return { date, setDate };
};
