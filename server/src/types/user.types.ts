import { Types, ObjectId } from 'mongoose';
import { Base, Timestamps } from './common.types';
import { Post } from './post.types';
import {
  AccessNeeds,
  BedTime,
  CleanAfterCooking,
  Cleanliness,
  CookingFrequency,
  Gender,
  GenderComfort,
  GuestFrequency,
  GuestTolerance,
  RoomTemperature,
  SleepEnvironment,
  SmokeFrequency,
  SmokeTolerance,
  StudyInRoom,
  StudyNoise,
  StudyTime,
  WakeTime,
} from './enums';

export interface Lifestyle {
  gender?: Gender;
  genderComfort?: GenderComfort;
  accessNeeds?: AccessNeeds;
  guestFrequency?: GuestFrequency;
  guestTolerance?: GuestTolerance;
  smokeFrequency?: SmokeFrequency;
  smokeTolerance?: SmokeTolerance;
  bedTime?: BedTime;
  wakeTime?: WakeTime;
  sleepEnvironment?: SleepEnvironment;
  studyInRoom?: StudyInRoom;
  studyTime?: StudyTime;
  studyNoise?: StudyNoise;
  cleanliness?: Cleanliness;
  roomTemperature?: RoomTemperature;
  cookingFrequency?: CookingFrequency;
  cleanAfterCooking?: CleanAfterCooking;
}

export interface User extends Base, Timestamps {
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
  isVerified: boolean;
  profileImage: string;
  bio: string;
  sublesseeHistory: (Types.ObjectId | ObjectId | Post)[];

  lifestyle?: Lifestyle;
  lifestyleVector?: number[];
}

export interface UserPayload {
  id: string;
  email: string;
}
