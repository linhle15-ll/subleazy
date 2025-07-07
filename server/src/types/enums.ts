export enum HouseType {
  HOUSE = 'house',
  APT = 'apartment',
}

export enum PlaceType {
  ENTIRE = 'entire',
  PRV = 'private',
  SHARED = 'shared',
}

export enum WhoElse {
  ME = 'me',
  FAM = 'family',
  GUESTS = 'guests',
  ROOMMATES = 'roommates',
}

export enum PostStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export enum GuestRule {
  NO_OVERNIGHT = 'No overnight guests',
  PRIOR_NOTICE = 'Guests allowed with prior notice',
  NO_PARTIES = 'No parties or large gatherings',
  NO_LOUD = 'No loud music or noise',
}

export enum LifestyleRule {
  NO_SMOKING = 'No smoking',
  SMOKING_OUTSIDE = 'Smoking allowed only outside and designated areas',
  NO_ALCOHOL = 'No alcohol allowed',
  NO_DRUGS = 'No recreational drugs',
}

export enum CleanlinessRule {
  CLEAN_SHARED = 'Keep shared areas clean',
  TAKE_OUT_TRASH = 'Take out trash regularly',
  RESPECT_PRIVACY = "Respect others' privacy",
}

export enum PetRule {
  NO_PETS = 'No pets allowed',
  APPROVAL = 'Pets allowed with approval',
}

export enum UtilitiesRule {
  FRIDGE_ONLY = 'Shared fridge place only',
  ECO_SHOWER = 'Economical use of showers and water',
  ECO_ELECTRICITY = 'Economical use of electricity (lights, AC, etc)',
  LIMIT_LAUNDRY = 'Limit on laundry use',
}

export enum SafetyRule {
  REPORT_ISSUES = 'Report issues immediately',
  NO_TAMPER = 'Do not tamper with locks/security',
  LOCK_DOOR = 'Keep door locked when leaving',
}

export enum MoveRule {
  RETURN_KEYS = 'Return keys at the end of stay',
  LEAVE_ORIGINAL = 'Leave room in original condition',
}

// Lifestyle
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NONBINARY = 'nonbinary',
  NO_SAY = 'prefer not say',
}

export enum GenderComfort {
  SAME = 'prefer same gender',
  ANY = 'any gender is fine',
}

export enum AccessNeeds {
  YES = 'has access needs and prefer someone understands',
  NEUTRAL = 'does not have access needs but happy to live with someone who does',
  NO = 'not applicable or prefer not to say',
}

export enum GuestFrequency {
  FREQUENTLY = 'frequently',
  OCCASIONALLY = 'occasionally',
  NEVER = 'rarely or never',
}

export enum GuestTolerance {
  FREQUENTLY = 'fine with frequent guests',
  OCCASIONALLY = 'fine with occasional guests',
  NEVER = 'fine with little or no guests',
  NO_PREF = 'no preference',
}

export enum SmokeFrequency {
  FREQUENTLY = 'daily or often',
  OCCASIONALLY = 'socially or irregularly',
  NEVER = 'does not smoke/vape',
}

export enum SmokeTolerance {
  FREQUENTLY = 'fine with smoking',
  OCCASIONALLY = 'fine with occasional smoking',
  NEVER = 'prefer no smoking',
  NO_PREF = 'no preference',
}

export enum BedTime {
  EARLY = 'before 12:00 am',
  MIDNIGHT = '12:00 - 1:00 am',
  LATE = 'after 1:00 am',
  NO_PREF = 'no preference',
}

export enum WakeTime {
  EARLY = 'before 7:30 am',
  AVERAGE = '7:30 - 9:00 am',
  LATE = 'after 9:00 am',
  NO_PREF = 'no preference',
}

export enum SleepEnvironment {
  NO_NOISE_LIGHT = 'completely quiet and dark',
  SOME_NOISE_LIGHT = 'okay with some noise or light',
  NO_PREF = 'no preference',
}

export enum StudyInRoom {
  FREQUENTLY = 'always or frequently',
  OCCASIONALLY = 'sometimes',
  NEVER = 'never',
}

export enum StudyTime {
  EARLY_MORNING = 'before 9:00 am',
  DAYTIME = 'daytime',
  NIGHT = '7:00 pm - 12:00 am',
  LATE_NIGHT = 'after 12:00 am',
  NO_PREF = 'varies',
}

export enum StudyNoise {
  FREQUENTLY = 'always or frequently',
  OCCASIONALLY = 'sometimes',
  NEVER = 'never',
}

export enum Cleanliness {
  VERY = 'daily cleaning',
  CLEAN = 'weekly cleaning',
  AVERAGE = 'average',
  MESSY = 'messy',
}

export enum RoomTemperature {
  COOL = 'cool',
  AVERAGE = 'average',
  WARM = 'warm',
  NO_PREF = 'no preference',
}

export enum CookingFrequency {
  FREQUENTLY = 'daily',
  OCCASIONALLY = 'occasionally',
  NEVER = 'rarely or never',
}

export enum CleanAfterCooking {
  RIGHT_AFTER = 'clean up right after cooking or meal',
  ONCE_A_DAY = 'clean up once a day',
  WHENEVER_HAVE_TIME = 'clean up whenever get to it',
}
