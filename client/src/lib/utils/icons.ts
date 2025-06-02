import { Home, User, Users, Building } from 'lucide-react';
import { PlaceType, HouseType } from '@/lib/types/enums';

export const getPlaceTypeIcon = (type: PlaceType) => {
  switch (type) {
    case PlaceType.ENTIRE:
      return Home;
    case PlaceType.PRV:
      return User;
    case PlaceType.SHARED:
      return Users;
    default:
      return Home;
  }
};

export const getHouseTypeIcon = (type: HouseType) => {
  switch (type) {
    case HouseType.HOUSE:
      return Home;
    case HouseType.APT:
      return Building;
    default:
      return Home;
  }
};
