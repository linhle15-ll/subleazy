import {
  AccessNeeds,
  Gender,
  GenderComfort,
  GuestFrequency,
  GuestTolerance,
  SmokeFrequency,
  SmokeTolerance,
} from '../../types/enums';
import { Lifestyle } from '../../types/user.types';
import {
  accessNeedsMap,
  guestFrequencyMap,
  guestToleranceMap,
  smokeFrequencyMap,
  smokeToleranceMap,
} from './mapping';

const genderFilter = (
  gender1?: Gender,
  gender2?: Gender,
  comfort1?: GenderComfort,
  comfort2?: GenderComfort
): boolean => {
  if (comfort1 === GenderComfort.SAME || comfort2 === GenderComfort.SAME) {
    if (gender1 !== gender2) {
      return false;
    }
  }

  return true;
};

const accessNeedsFilter = (
  access1?: AccessNeeds,
  access2?: AccessNeeds
): boolean => {
  if (!access1 || !access2) return true;
  const mapped1 = accessNeedsMap[access1];
  const mapped2 = accessNeedsMap[access2];

  const isInvalid =
    (mapped1 === 5 && mapped2 === 1) || (mapped2 === 5 && mapped1 === 1);

  return !isInvalid;
};

const guestFilter = (
  guestFreq1?: GuestFrequency,
  guestFreq2?: GuestFrequency,
  guestTol1?: GuestTolerance,
  guestTol2?: GuestTolerance
): boolean => {
  if (!guestFreq1 || !guestFreq2 || !guestTol1 || !guestTol2) return true;
  const freq1 = guestFrequencyMap[guestFreq1];
  const freq2 = guestFrequencyMap[guestFreq2];
  const tol1 = guestToleranceMap[guestTol1];
  const tol2 = guestToleranceMap[guestTol2];

  return tol1 >= freq2 && tol2 >= freq1;
};

const smokeFilter = (
  smokeFreq1?: SmokeFrequency,
  smokeFreq2?: SmokeFrequency,
  smokeTol1?: SmokeTolerance,
  smokeTol2?: SmokeTolerance
): boolean => {
  if (!smokeFreq1 || !smokeFreq2 || !smokeTol1 || !smokeTol2) return true;
  const freq1 = smokeFrequencyMap[smokeFreq1];
  const freq2 = smokeFrequencyMap[smokeFreq2];
  const tol1 = smokeToleranceMap[smokeTol1];
  const tol2 = smokeToleranceMap[smokeTol2];

  return tol1 >= freq2 && tol2 >= freq1;
};

export const lifestyleFilter = (l1: Lifestyle, l2: Lifestyle): boolean => {
  return (
    genderFilter(l1.gender, l2.gender, l1.genderComfort, l2.genderComfort) &&
    accessNeedsFilter(l1.accessNeeds, l2.accessNeeds) &&
    guestFilter(
      l1.guestFrequency,
      l2.guestFrequency,
      l1.guestTolerance,
      l2.guestTolerance
    ) &&
    smokeFilter(
      l1.smokeFrequency,
      l2.smokeFrequency,
      l1.smokeTolerance,
      l2.smokeTolerance
    )
  );
};
