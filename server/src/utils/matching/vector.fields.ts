export const vectorFields = [
  'guestFrequency',
  'smokeFrequency',
  'bedTime',
  'wakeTime',
  'sleepEnvironment',
  'studyInRoom',
  'studyTime',
  'studyNoise',
  'cleanliness',
  'roomTemperature',
  'cookingFrequency',
  'cleanAfterCooking',
] as const;

export type VectorField = (typeof vectorFields)[number];
