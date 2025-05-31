import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';

export const useAddressSuggestions = (
  input: string,
  requestOptions: Partial<google.maps.places.AutocompleteRequest> = {}
) => {
  const placesLib = useMapsLibrary('places');
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);

  useEffect(() => {
    if (!placesLib) return;

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

    if (!sessionTokenRef.current)
      sessionTokenRef.current = new AutocompleteSessionToken();

    if (!input) {
      setSuggestions([]);
      return;
    }

    AutocompleteSuggestion.fetchAutocompleteSuggestions({
      ...requestOptions,
      includedRegionCodes: ['US'],
      sessionToken: sessionTokenRef.current,
      input,
    }).then((res) => setSuggestions(res.suggestions));
  }, [input, placesLib]);

  const resetSession = () => {
    sessionTokenRef.current = null;
    setSuggestions([]);
  };

  return { suggestions, resetSession };
};
