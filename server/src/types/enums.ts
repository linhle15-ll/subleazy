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
