import { Lifestyle } from '../../types/user.types';
import { lifestyleEnumToNumber } from './mapping';
import { vectorFields } from './vector.fields';

export const lifestyleToVector = (lifestyle: Lifestyle): number[] => {
  return vectorFields.map((field) => {
    const lifestyleValue = lifestyle[field];
    const mappedValue = lifestyleEnumToNumber[field];
    return mappedValue[lifestyleValue as keyof typeof mappedValue] ?? 0;
  });
};
