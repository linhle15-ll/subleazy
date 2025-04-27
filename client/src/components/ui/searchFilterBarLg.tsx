import { Search, Filter } from 'lucide-react';

const SearchFilterBar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-3xl px-6 py-6 sm:px-4 sm:py-4 gap-4 sm:gap-6 w-full sm:w-fit">
      {/* Where */}
      <div className="input-field">
        <span className="text-sm font-medium text-left">Where</span>
        <input
          type="text"
          placeholder="Search location"
          className="text-sm focus:outline-none border-transparent rounded-md pr-2 py-1 w-full sm:w-auto"
        />
      </div>

      {/* Check-in */}
      <div className="input-field">
        <span className="text-sm font-medium text-left">Check in</span>
        <input
          type="text"
          placeholder="Add dates"
          className="text-sm focus:outline-none border-transparent rounded-md pr-2 py-1"
        />
      </div>

      {/* Check-out */}
      <div className="input-field">
        <span className="text-sm font-medium text-left">Check out</span>
        <input
          type="text"
          placeholder="Add dates"
          className="text-sm focus:outline-none border-transparent rounded-md pr-2 py-1"
        />
      </div>

      {/* Filter icon + text */}
      <div className="flex items-center gap-2 w-full sm:w-auto sm:pr-4">
        <Filter className="h-6 w-6 text-grey" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Search Button */}
      <button className="bg-primaryOrange text-white p-3 rounded-full shadow-md w-full sm:w-auto flex items-center justify-center">
        <Search className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default SearchFilterBar;