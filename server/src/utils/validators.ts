import { PostRequestBody } from '../types/post.types';

export const validateMedia = (data: string[]) => data.length >= 5;

export const validateTime = (data: string) => {
  if (!data) return true; // Time is optional

  const regex = /^(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  return regex.test(data);
};

export const validatePostData = (data: PostRequestBody): boolean => {
  return (
    !validateMedia(data.media) ||
    !validateTime(data.availability.checkinTime as string) ||
    !validateTime(data.availability.checkoutTime as string) ||
    !validateTime(data.rules?.quietHours?.from as string) ||
    !validateTime(data.rules?.quietHours?.to as string)
  );
};
