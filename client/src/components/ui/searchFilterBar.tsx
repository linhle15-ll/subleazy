import { SearchIcon, FilterIcon } from '@/lib/utils/icons';

const SearchFilterBar = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-3xl px-4 py-4 gap-6 w-fit">
      {/* Where */}
      <div className="flex flex-col gap-2 w-1/2 pr-4 border-r border-gray-300">
        <span className="text-sm font-medium">Where</span>
        <input
          type="text"
          placeholder="Search location"
          className="text-sm focus:outline-none"
        />
      </div>

      {/* Check-in */}
      <div className="flex flex-col gap-2 pr-4 border-r border-gray-300">
        <span className="text-sm font-medium">Check in</span>
        <input
          type="text"
          placeholder="Add dates"
          className="text-sm focus:outline-none"
        />
      </div>

      {/* Check-out */}
      <div className="flex flex-col gap-2 pr-4 border-r border-gray-300">
        <span className="text-sm font-medium">Check out</span>
        <input
          type="text"
          placeholder="Add dates"
          className="text-sm focus:outline-none"
        />
      </div>

      {/* Filter icon + text */}
      <div className="flex items-center gap-2 pr-4">
        {FilterIcon}
        <span className="text-sm font-medium">Filters</span>
      </div>

      {/* Search Button */}
      <button className="bg-primaryOrange text-white p-3 rounded-full shadow-md">
        {SearchIcon}
      </button>
    </div>

    // add open filter box and modals to select dates and location suggestions (bound: United States)
  );
};

export default SearchFilterBar;
