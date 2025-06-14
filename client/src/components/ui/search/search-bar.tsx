'use client';

import { Search, MapPin, Calendar } from 'lucide-react';
import { DatePickerWithPresets } from '../date/date-picker';
import { FilterMenu } from './filter-menu';
import { PlaceAutocomplete } from '../map/place-autocomplete';
import { useFilterLocation } from '@/hooks/use-filter-location';
import { useSearchHandler } from '@/hooks/use-search-handler';

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

export function SearchBarLg() {
  const setPlace = useFilterLocation();
  const handleSearch = useSearchHandler();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-3xl p-4 gap-4 sm:gap-6 w-full sm:w-fit">
      {/* Where */}
      <InputField icon={MapPin} label="Where">
        <PlaceAutocomplete
          onPlaceSelect={setPlace}
          className="w-full sm:w-[25vw] flex justify-start text-left font-normal focus:outline-none border-transparent rounded-md pr-2 py-1"
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

export function SearchBarSm() {
  const setPlace = useFilterLocation();
  const handleSearch = useSearchHandler();

  return (
    <div className="flex items-center bg-white rounded-2xl border border-gray-700 gap-2 px-4 py-2 m-auto w-[90vw]">
      <div className="flex-grow">
        <PlaceAutocomplete
          onPlaceSelect={setPlace}
          className="w-full justify-start text-left font-normal focus:outline-none border-transparent rounded-md"
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <FilterMenu isLandingPage={false} />
        <button
          className="bg-primaryOrange text-white p-3 rounded-full w-auto flex items-center justify-center"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
