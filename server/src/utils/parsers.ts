import { Place } from '../types/house.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseGoogleMapPlaces = (places: any[]) => {
  const result: Place[] = [];

  if (!Array.isArray(places) || places.length === 0) {
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  places.forEach((place: any) => {
    result.push({
      displayName: place.displayName.text,
      shortAddress: place.shortFormattedAddress,
      lat: place.location.latitude,
      long: place.location.longitude,
      googleMapsUri: place.googleMapsUri,
      photo:
        place.photos?.length > 0 ? place.photos[0].googleMapsUri : undefined,
    });
  });

  return result;
};
