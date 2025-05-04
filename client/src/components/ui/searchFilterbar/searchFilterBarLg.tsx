'use client';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { DatePickerWithPresets } from '@/components/ui/date/datePicker';

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

export default function SearchFilterBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-3xl px-4 py-4 sm:px-4 sm:py-4 gap-4 sm:gap-6 w-full sm:w-fit">
      {/* Where */}
      <InputField icon={MapPin} label="Where">
        <input
          type="text"
          placeholder="Search location"
          className="focus:outline-none border-transparent rounded-md pr-2 py-1 w-full sm:w-auto"
        />
      </InputField>

      {/* Check-in */}
      <InputField icon={Calendar} label="Check in">
        <DatePickerWithPresets />
      </InputField>

      {/* Check-out */}
      <InputField icon={Calendar} label="Check out">
        <DatePickerWithPresets />
      </InputField>

      {/* Filter icon + text */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:pr-4">
        <Filter className="h-6 w-6 text-grey" />
        <span className="font-medium">Filters</span>
      </div>

      {/* Search Button */}
      <button className="bg-primaryOrange text-white p-3 rounded-full shadow-md w-full sm:w-auto flex items-center justify-center">
        <Search className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
