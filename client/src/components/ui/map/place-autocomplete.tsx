'use client';

import { useAddressSuggestions } from '@/hooks/use-address-suggestions';
import { cn } from '@/lib/cn-utils';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function PlaceAutocomplete({
  onPlaceSelect,
  className,
}: {
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
  className: string;
}) {
  const placesLib = useMapsLibrary('places');
  const [inputValue, setInputValue] = useState('');
  const { suggestions, resetSession } = useAddressSuggestions(inputValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!showSuggestions) setActiveIndex(-1);
  }, [showSuggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = async (
    suggestion: google.maps.places.AutocompleteSuggestion
  ) => {
    if (!placesLib || !suggestion.placePrediction) return;

    const { place } = await suggestion.placePrediction.toPlace().fetchFields({
      fields: ['location', 'formattedAddress', 'addressComponents'],
    });

    setShowSuggestions(false);
    setInputValue(place.formattedAddress || '');
    onPlaceSelect(place);
    resetSession();
  };

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (!suggestions.length) return;

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(
              (prevIndex) =>
                (prevIndex - 1 + suggestions.length) % suggestions.length
            );
          } else if (e.key === 'Enter') {
            e.preventDefault();
            handleSelect(suggestions[activeIndex]);
          }
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => setShowSuggestions(true)}
        className={className}
        placeholder="Search for a place"
      />
      {suggestions.length > 0 && showSuggestions && (
        <ul className="absolute w-full border rounded-md bg-white shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className={cn(
                'p-2 hover:bg-gray-100 hover:font-medium cursor-pointer focus:outline-none',
                activeIndex === index && 'bg-gray-100 font-medium'
              )}
            >
              {suggestion.placePrediction?.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
