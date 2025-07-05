import { Base } from './common.types';

export interface Place {
  displayName: string;
  shortAddress: string;
  lat: number;
  long: number;
  googleMapsUri: string;
}

export interface NearbyAmenities {
  supermarkets: Place[];
  publicTransports: Place[];
}

export interface House extends Base {
  address: string;
  zip: string;
  nearbyAmenities?: NearbyAmenities;
}
