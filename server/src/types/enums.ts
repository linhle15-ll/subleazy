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
  MALE = 'Male',
  FEMALE = 'Female',
  NONBINARY = 'Nonbinary',
  NO_SAY = 'Prefer not to say',
}

export enum GenderComfort {
  SAME = 'Same gender only',
  ANY = 'Any gender',
}

export enum AccessNeeds {
  YES = 'I have accessibility needs and would like understanding housemates',
  NEUTRAL = "I don't have access needs but would be happy to live with someone who does / No preference",
  NO = 'Not applicable / prefer not to say',
}

export enum GuestFrequency {
  FREQUENTLY = 'Frequently',
  OCCASIONALLY = 'Occasionally',
  NEVER = 'Rarely / Never',
}

export enum GuestTolerance {
  FREQUENTLY = 'Frequent guests are fine',
  OCCASIONALLY = 'Occasional guests are fine',
  NEVER = 'Prefer little to no guests',
  NO_PREF = 'No preference',
}

export enum SmokeFrequency {
  FREQUENTLY = 'Daily / often',
  OCCASIONALLY = 'Socially / irregularly',
  NEVER = 'Does not smoke/vape',
}

export enum SmokeTolerance {
  FREQUENTLY = 'Okay with smoking',
  OCCASIONALLY = 'Occasional smoking is fine',
  NEVER = 'Prefer no smoking',
  NO_PREF = 'No preference',
}

export enum BedTime {
  EARLY = 'Early (before 12:00 am)',
  MIDNIGHT = 'Around midnight (12:00 - 1:00 am)',
  LATE = 'Late (after 1:00 am)',
  NO_PREF = 'No preference',
}

export enum WakeTime {
  EARLY = 'Before 7:30 am',
  AVERAGE = '7:30 - 9:00 am',
  LATE = 'After 9:00 am',
  NO_PREF = 'No preference',
}

export enum SleepEnvironment {
  NO_NOISE_LIGHT = 'Completely quiet and dark',
  SOME_NOISE_LIGHT = 'Some light or white noise is okay',
  NO_PREF = "Doesn't matter to me",
}

export enum StudyInRoom {
  FREQUENTLY = 'Always or frequently',
  OCCASIONALLY = 'Sometimes',
  NEVER = 'Never',
}

export enum StudyTime {
  EARLY_MORNING = 'Early morning (before 9:00 am)',
  DAYTIME = 'Daytime',
  NIGHT = 'Night (7:00 pm - 12:00 am)',
  LATE_NIGHT = 'Late night (after 12:00 am)',
  NO_PREF = 'Varies',
}

export enum StudyNoise {
  FREQUENTLY = 'Always or frequently',
  OCCASIONALLY = 'Sometimes',
  NEVER = 'Never',
}

export enum Cleanliness {
  VERY = 'Very clean (daily cleaning)',
  CLEAN = 'Clean (weekly cleaning)',
  AVERAGE = 'Average',
  MESSY = 'Messy',
}

export enum RoomTemperature {
  COOL = 'Cool (below 68F / 20C)',
  AVERAGE = 'Average (68-72F / 20-22C)',
  WARM = 'Warm (above 72F / 22C)',
  NO_PREF = 'No preference',
}

export enum CookingFrequency {
  FREQUENTLY = 'Daily',
  OCCASIONALLY = 'Occasionally',
  NEVER = 'Rarely or never',
}

export enum CleanAfterCooking {
  RIGHT_AFTER = 'After cooking or after meal',
  ONCE_A_DAY = 'Once a day',
  WHENEVER_HAVE_TIME = 'Whenever I get to it',
}
