import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { User } from './user.types';
import { House } from './house.types';
import { HouseType, PetRule, PlaceType, PostStatus, WhoElse } from './enums';

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
  tv: boolean;
  ac: boolean; // air conditioning
  heating: boolean;
  kitchen: boolean;
  washer: boolean;
  dryer: boolean;
  parking: boolean;
  pool: boolean;
  pet: boolean; // pet friendly
  coffee: boolean; // coffee maker
  CookingPot: boolean;
  microwave: boolean;
  balcony: boolean;
  gym: boolean;
  workspace: boolean;
  hairdryer: boolean;
  Shirt: boolean;
  fireplace: boolean;
  outdoor: boolean; // outdoor dining
  smoke: boolean; // smoke alarm
  co: boolean; // CO alarm
  extinguisher: boolean; // fire extinguisher
  firstaid: boolean; // first aid kit
  camera: boolean; // security cameras
  lock: boolean; // lock on bedroom
  exit: boolean; // emergency exit
}

interface Convenience {
  publicTransport: boolean;
  supermarket: boolean;
  disabilityFriendly: boolean;
}

interface GuestRule {
  noGuest: boolean;
  noOverNight: boolean;
  noParty: boolean;
  noMusic: boolean;
  quietHours: {
    from: string;
    to: string;
  };
}

interface Lifestyle {
  noSmoking: boolean;
  allowSmokingOutside: boolean;
  noAlcohol: boolean;
  noDrugs: boolean;
}

interface Cleanliness {
  cleanShared: boolean;
  takeOutTrash: boolean;
  respectPrivacy: boolean;
}

interface PetRule {
  noPets: boolean;
  approval: boolean;
}

interface Utilities {
  fridgeOnly: boolean;
  ecoShower: boolean;
  ecoElectricity: boolean;
  limitLaundry: boolean;
}

interface Safety {
  reportIssues: boolean;
  noTamper: boolean;
  lockDoor: boolean;
}

interface Move {
  returnKeys: boolean;
  leaveOriginal: boolean;
}

interface Rules {
  guest: GuestRule;
  lifestyle: Lifestyle;
  cleanliness: Cleanliness;
  pet: PetRule;
  utilities: Utilities;
  safety: Safety;
  move: Move;
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
  author: Types.ObjectId | ObjectId | User;
  sublessees: (Types.ObjectId | ObjectId | User)[];
  house?: Types.ObjectId | ObjectId | House;
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
