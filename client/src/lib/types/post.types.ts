import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { House } from './house.types';
import { HouseType, PlaceType, PostStatus, WhoElse } from './enums';

interface HouseInfo {
  houseType: HouseType;
  placeType: PlaceType;
}

interface BedroomInfo {
  maxGuests: number;
  bedrooms: number;
  beds: number;
  lock: boolean;
}

interface BathroomInfo {
  privateAttached: number;
  privateAccessible: number;
  shared: number;
}

interface Amenities {
  wifi: boolean;
  kitchen: boolean;
  laundry: boolean;
  parking: boolean;
  airConditioning: boolean;
}

interface Convenience {
  publicTransport: boolean;
  supermarket: boolean;
  disabilityFriendly: boolean;
}

interface Rules {
  noGuest: boolean;
  noParty: boolean;
  quietHours?: {
    from?: string;
    to?: string;
  };
  noSmoking: boolean;
  noDrug: boolean;
  noPet: boolean;
}

interface Availability {
  startDate: Date;
  endDate: Date;
  checkinTime?: string;
  checkoutTime?: string;
}

export interface Post extends Base, Timestamps {
  title: string;
  description: string;
  media: string[];
  author: string | User;
  sublessees: (string | User)[];
  house?: string | House;
  houseInfo: HouseInfo;
  suites?: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  long: number;
  bedroomInfo: BedroomInfo;
  bathroomInfo: BathroomInfo;
  whoElse: WhoElse[];
  amenities: Amenities;
  convenience: Convenience;
  price: number;
  rules: Rules;
  availability: Availability;
  status: PostStatus;
}

export interface PostRequestBody extends Post {
  address: string;
  minPrice: number;
  maxPrice: number;
}
