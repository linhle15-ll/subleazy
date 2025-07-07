import { Schema, model } from 'mongoose';
import { User } from '../types/user.types';
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
} from '../types/enums';

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      // default: add a default profile image link here
    },
    bio: {
      type: String,
      trim: true,
    },
    sublesseeHistory: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Where user has been a sublessee

    lifestyle: {
      gender: {
        type: String,
        enum: Object.values(Gender),
      },
      genderComfort: {
        type: String,
        enum: Object.values(GenderComfort),
      },
      accessNeeds: {
        type: String,
        enum: Object.values(AccessNeeds),
      },
      guestFrequency: {
        type: String,
        enum: Object.values(GuestFrequency),
      },
      guestTolerance: {
        type: String,
        enum: Object.values(GuestTolerance),
      },
      smokeFrequency: {
        type: String,
        enum: Object.values(SmokeFrequency),
      },
      smokeTolerance: {
        type: String,
        enum: Object.values(SmokeTolerance),
      },
      bedTime: {
        type: String,
        enum: Object.values(BedTime),
      },
      wakeTime: {
        type: String,
        enum: Object.values(WakeTime),
      },
      sleepEnvironment: {
        type: String,
        enum: Object.values(SleepEnvironment),
      },
      studyInRoom: {
        type: String,
        enum: Object.values(StudyInRoom),
      },
      studyTime: {
        type: String,
        enum: Object.values(StudyTime),
      },
      studyNoise: {
        type: String,
        enum: Object.values(StudyNoise),
      },
      cleanliness: {
        type: String,
        enum: Object.values(Cleanliness),
      },
      roomTemperature: {
        type: String,
        enum: Object.values(RoomTemperature),
      },
      cookingFrequency: {
        type: String,
        enum: Object.values(CookingFrequency),
      },
      cleanAfterCooking: {
        type: String,
        enum: Object.values(CleanAfterCooking),
      },
    },
    lifestyleVector: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);
