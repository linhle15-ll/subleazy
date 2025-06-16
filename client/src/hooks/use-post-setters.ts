import { DeepPartial } from '@/lib/types/common.types';
import { HouseType, PlaceType, WhoElse } from '@/lib/types/enums';
import {
  Amenities,
  BathroomInfo,
  BedroomInfo,
  Convenience,
  HouseInfo,
  PostRequestBody,
  Rules,
} from '@/lib/types/post.types';

export const usePostSetters = (
  setPost: (
    update:
      | Partial<PostRequestBody>
      | DeepPartial<PostRequestBody>
      | ((
          prev: Partial<PostRequestBody> | DeepPartial<PostRequestBody>
        ) => Partial<PostRequestBody> | DeepPartial<PostRequestBody>)
  ) => void
) => {
  const setTitleDescription = (key: 'title' | 'description', value: string) => {
    setPost((post) => ({
      ...post,
      [key]: value,
    }));
  };

  const setHouseInfo = (
    key: keyof HouseInfo,
    value: HouseType | PlaceType | undefined
  ) => {
    setPost((post) => ({
      ...post,
      houseInfo: {
        ...post.houseInfo,
        [key]: value,
      },
    }));
  };

  const setAddress = (
    key: 'address' | 'city' | 'state' | 'zip' | 'suites',
    value: string
  ) => {
    setPost((post) => ({
      ...post,
      [key]: value,
    }));
  };

  const setLocation = (key: 'lat' | 'long', value: number) => {
    setPost((post) => ({
      ...post,
      [key]: value,
    }));
  };

  const setBedroomInfo = (key: keyof BedroomInfo, value: number | boolean) => {
    setPost((post) => ({
      ...post,
      bedroomInfo: {
        ...post.bedroomInfo,
        [key]: value,
      },
    }));
  };

  const setBathroomInfo = (key: keyof BathroomInfo, value: number) => {
    setPost((post) => ({
      ...post,
      bathroomInfo: {
        ...post.bathroomInfo,
        [key]: value,
      },
    }));
  };

  const setWhoElse = (value: WhoElse) => {
    setPost((post) => {
      const curValues = post.whoElse || [];
      const newValues = curValues.includes(value)
        ? curValues.filter((item) => item !== value)
        : [...curValues, value];
      return {
        ...post,
        whoElse: newValues,
      };
    });
  };

  const setAmenities = (key: keyof Amenities) => {
    setPost((post) => ({
      ...post,
      amenities: {
        ...post.amenities,
        [key]: !post.amenities?.[key],
      },
    }));
  };

  const setConvenience = (key: keyof Convenience) => {
    setPost((post) => ({
      ...post,
      convenience: {
        ...post.convenience,
        [key]: !post.convenience?.[key],
      },
    }));
  };

  const setPrice = (key: 'price' | 'minPrice' | 'maxPrice', value: number) => {
    setPost((post) => ({
      ...post,
      [key]: value,
    }));
  };

  const setRules = (key: keyof Rules) => {
    setPost((post) => ({
      ...post,
      rules: {
        ...post.rules,
        [key]: !post.rules?.[key],
      },
    }));
  };

  const setQuietHours = (from: string, to: string) => {
    setPost((post) => ({
      ...post,
      rules: {
        ...post.rules,
        quietHours: {
          from,
          to,
        },
      },
    }));
  };

  const setDate = (key: 'startDate' | 'endDate', value: Date | undefined) => {
    setPost((post) => ({
      ...post,
      availability: {
        ...post.availability,
        [key]: value,
      },
    }));
  };

  const setCheckTime = (key: 'checkinTime' | 'checkoutTime', value: string) => {
    setPost((post) => ({
      ...post,
      availability: {
        ...post.availability,
        [key]: value,
      },
    }));
  };

  return {
    setTitleDescription,
    setHouseInfo,
    setAddress,
    setLocation,
    setBedroomInfo,
    setBathroomInfo,
    setWhoElse,
    setAmenities,
    setConvenience,
    setPrice,
    setRules,
    setQuietHours,
    setDate,
    setCheckTime,
  };
};
