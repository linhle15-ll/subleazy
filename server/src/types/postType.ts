import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './commonType';
import { User } from './userType';
import { House } from './houseType';
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
  guest: boolean;
  party: boolean;
  loudMusic: boolean;
  quietHours: {
    from?: string;
    to?: string;
  };
  smoking: boolean;
  alcohol: boolean;
  drug: boolean;
  pet: boolean;
  children: boolean;
}

interface Availability {
  startDate: Date;
  endDate: Date;
  checkinTime: string;
  checkoutTime: string;
}

export interface Post extends Base, Timestamps {
  title: string;
  description: string;
  media: [string];
  author: Types.ObjectId | ObjectId | User;
  sublessees: [Types.ObjectId | ObjectId | User];
  house?: Types.ObjectId | ObjectId | House;
  houseInfo: HouseInfo;
  suites?: string;
  city: string;
  state: string;
  zip: string;
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
  lat: number;
  long: number;
}
