'use client';

import { Search, MapPin, Calendar } from 'lucide-react';
import { DatePickerWithPresets } from '../date/date-picker';
import { FilterMenu } from './filter-menu';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/lib/stores/filter.store';
import { encodeQuery } from '@/lib/utils/search-query';

const InputField = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children?: React.ReactNode;
}) => (
  <div className="input-field">
    <div className="flex flex-row gap-2">
      <Icon />
      <span className="font-medium text-left">{label}</span>
    </div>
    {children}
  </div>
);

export function SearchBar() {
  const router = useRouter();
  const filters = useFilterStore((state) => state.filters);

  const handleSearch = () => {
    if (!filters.zip && !filters.state && (!filters.lat || !filters.long))
      return;

    if (Object.values(filters).length) {
      const query = encodeQuery(filters);
      router.push(`/posts/search?q=${query}`);
    }
  };

  // TODO: Add location autocomplete
  // TODO: Add filter location update

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-3xl px-4 py-4 sm:px-4 sm:py-4 gap-4 sm:gap-6 w-full sm:w-fit">
      {/* Where */}
      <InputField icon={MapPin} label="Where">
        <input
          type="text"
          placeholder="Search location"
          className="w-[25vw] flex justify-start text-left font-normal focus:outline-none border-transparent rounded-md pr-2 py-1 pl-0"
        />
      </InputField>

      {/* Check-in */}
      <InputField icon={Calendar} label="Check in">
        <DatePickerWithPresets field="startDate" />
      </InputField>

      {/* Check-out */}
      <InputField icon={Calendar} label="Check out">
        <DatePickerWithPresets field="endDate" />
      </InputField>

      {/* Filter icon + text */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:pr-4">
        <FilterMenu isLandingPage={true} />
      </div>

      {/* Search Button */}
      <button
        className="bg-primaryOrange text-white p-3 rounded-full shadow-md w-full sm:w-auto flex items-center justify-center"
        onClick={handleSearch}
      >
        <Search className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
