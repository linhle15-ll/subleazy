import { VectorField } from './vector.fields';
import {
  AccessNeeds,
  BedTime,
  CleanAfterCooking,
  Cleanliness,
  CookingFrequency,
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
} from '../../types/enums';

export const accessNeedsMap: Record<AccessNeeds, number> = {
  [AccessNeeds.YES]: 5,
  [AccessNeeds.NEUTRAL]: 3,
  [AccessNeeds.NO]: 1,
};

export const guestFrequencyMap: Record<GuestFrequency, number> = {
  [GuestFrequency.FREQUENTLY]: 5,
  [GuestFrequency.OCCASIONALLY]: 3,
  [GuestFrequency.NEVER]: 1,
};

export const guestToleranceMap: Record<GuestTolerance, number> = {
  [GuestTolerance.FREQUENTLY]: 5,
  [GuestTolerance.OCCASIONALLY]: 3,
  [GuestTolerance.NEVER]: 1,
  [GuestTolerance.NO_PREF]: 5,
};

export const smokeFrequencyMap: Record<SmokeFrequency, number> = {
  [SmokeFrequency.FREQUENTLY]: 5,
  [SmokeFrequency.OCCASIONALLY]: 3,
  [SmokeFrequency.NEVER]: 1,
};

export const smokeToleranceMap: Record<SmokeTolerance, number> = {
  [SmokeTolerance.FREQUENTLY]: 5,
  [SmokeTolerance.OCCASIONALLY]: 3,
  [SmokeTolerance.NEVER]: 1,
  [SmokeTolerance.NO_PREF]: 5,
};

const bedTimeMap: Record<BedTime, number> = {
  [BedTime.EARLY]: 5,
  [BedTime.MIDNIGHT]: 3,
  [BedTime.LATE]: 1,
  [BedTime.NO_PREF]: 3,
};

const wakeTimeMap: Record<WakeTime, number> = {
  [WakeTime.EARLY]: 5,
  [WakeTime.AVERAGE]: 3,
  [WakeTime.LATE]: 1,
  [WakeTime.NO_PREF]: 3,
};

const sleepEnvironmentMap: Record<SleepEnvironment, number> = {
  [SleepEnvironment.NO_NOISE_LIGHT]: 5,
  [SleepEnvironment.SOME_NOISE_LIGHT]: 3,
  [SleepEnvironment.NO_PREF]: 3,
};

const studyInRoomMap: Record<StudyInRoom, number> = {
  [StudyInRoom.FREQUENTLY]: 5,
  [StudyInRoom.OCCASIONALLY]: 3,
  [StudyInRoom.NEVER]: 1,
};

const studyTimeMap: Record<StudyTime, number> = {
  [StudyTime.EARLY_MORNING]: 5,
  [StudyTime.DAYTIME]: 4,
  [StudyTime.NIGHT]: 2,
  [StudyTime.LATE_NIGHT]: 1,
  [StudyTime.NO_PREF]: 3,
};

const studyNoiseMap: Record<StudyNoise, number> = {
  [StudyNoise.FREQUENTLY]: 5,
  [StudyNoise.OCCASIONALLY]: 3,
  [StudyNoise.NEVER]: 1,
};

const cleanlinessMap: Record<Cleanliness, number> = {
  [Cleanliness.VERY]: 5,
  [Cleanliness.CLEAN]: 4,
  [Cleanliness.AVERAGE]: 3,
  [Cleanliness.MESSY]: 1,
};

const roomTemperatureMap: Record<RoomTemperature, number> = {
  [RoomTemperature.COOL]: 5,
  [RoomTemperature.AVERAGE]: 3,
  [RoomTemperature.WARM]: 1,
  [RoomTemperature.NO_PREF]: 3,
};

const cookingFrequencyMap: Record<CookingFrequency, number> = {
  [CookingFrequency.FREQUENTLY]: 5,
  [CookingFrequency.OCCASIONALLY]: 3,
  [CookingFrequency.NEVER]: 1,
};

const cleanAfterCookingMap: Record<CleanAfterCooking, number> = {
  [CleanAfterCooking.RIGHT_AFTER]: 5,
  [CleanAfterCooking.ONCE_A_DAY]: 3,
  [CleanAfterCooking.WHENEVER_HAVE_TIME]: 1,
};

export const lifestyleEnumToNumber: Record<
  VectorField,
  Record<string, number>
> = {
  guestFrequency: guestFrequencyMap,
  smokeFrequency: smokeFrequencyMap,
  bedTime: bedTimeMap,
  wakeTime: wakeTimeMap,
  sleepEnvironment: sleepEnvironmentMap,
  studyInRoom: studyInRoomMap,
  studyTime: studyTimeMap,
  studyNoise: studyNoiseMap,
  cleanliness: cleanlinessMap,
  roomTemperature: roomTemperatureMap,
  cookingFrequency: cookingFrequencyMap,
  cleanAfterCooking: cleanAfterCookingMap,
};
