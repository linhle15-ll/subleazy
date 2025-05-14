import { Home, User, Users } from 'lucide-react';

export enum PlaceType {
  ENTIRE = 'Entire',
  PRIVATE = 'Private',
  SHARED = 'Shared',
}

export const getPlaceTypeIcon = (type: PlaceType) => {
  switch (type) {
    case PlaceType.ENTIRE:
      return Home;
    case PlaceType.PRIVATE:
      return User;
    case PlaceType.SHARED:
      return Users;
    default:
      return Home; // Default to Home icon
  }
};
